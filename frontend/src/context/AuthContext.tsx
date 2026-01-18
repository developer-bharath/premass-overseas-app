import React, { createContext, useState, useEffect, ReactNode } from "react";

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

  const API_URL = "http://localhost:4000/api/auth";

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
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store email for OTP verification
      sessionStorage.setItem("registeredEmail", email);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // ============================================
  // VERIFY OTP FUNCTION
  // ============================================
  const verifyOtp = async (email: string, otp: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/verify-otp`, {
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
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Decode token to get user info
      const tokenPayload = JSON.parse(
        atob(data.token.split(".")[1])
      );

      const userData = {
        id: tokenPayload.id,
        name: email, // Backend should return name, for now use email
        email,
        role: tokenPayload.role,
      };

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", tokenPayload.role);

      setToken(data.token);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
