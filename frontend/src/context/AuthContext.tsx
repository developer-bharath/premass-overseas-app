import React, { createContext, useState, useEffect, ReactNode } from "react";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://premass-overseas-app-production.up.railway.app";


// ============================================
// AUTH CONTEXT TYPE
// ============================================
export interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
    role: "student" | "employee" | "admin" | "super_admin";
  } | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "student" | "employee"
  ) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => void;
}

// ============================================
// CREATE CONTEXT
// ============================================
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Use Vite env for API base, fallback to localhost for dev
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://premass-overseas-app-production.up.railway.app";



  // ============================================
  // RESTORE TOKEN ON MOUNT (Auto-login)
  // ============================================
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to restore auth state:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // ============================================
  // REGISTER FUNCTION
  // ============================================
  const register = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "employee"
  ) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    email,
    password,
    phone: "9999999999",
    department: "Admin",
    designation: "Counselor",
    role,
  }),
});


      // Handle network errors
      if (!res.ok) {
        let errorMessage = "Registration failed";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
        } catch {
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const response = await res.json();

      // Save email for OTP verification
      sessionStorage.setItem("registeredEmail", email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Improve error messages for network issues
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection.");
      }
      throw error;
    }
  };

  // ============================================
  // VERIFY OTP FUNCTION
  // ============================================
  const verifyOtp = async (email: string, otp: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, otp }),
});


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      sessionStorage.removeItem("registeredEmail");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // ============================================
  // LOGIN FUNCTION
  // ============================================
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


      // Handle network errors
      if (!res.ok) {
        let errorMessage = "Login failed";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const response = await res.json();
      const loginData = response.data || response;
      const token = loginData.token;
      const user = loginData.user;

      if (!token || !user) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      setToken(token);
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as any,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Improve error messages for network issues
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection.");
      }
      throw error;
    }
  };

  // ============================================
  // LOGOUT FUNCTION
  // ============================================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    sessionStorage.removeItem("registeredEmail");
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    verifyOtp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK
// ============================================
export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
