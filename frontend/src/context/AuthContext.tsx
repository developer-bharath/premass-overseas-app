import React, { createContext, useState, useEffect, ReactNode } from "react";
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
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
  resendOtp: (email: string) => Promise<void>;
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
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      console.log("📤 Registering user:", { email, role, apiUrl: `${API_BASE_URL}/api/auth/register` });

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: "9999999999",
          role,
          department: role === "student" ? "Student" : "Admin",
          designation: role === "student" ? "Student" : "Counselor",
        }),
        signal: controller.signal, // Add timeout signal
      });

      clearTimeout(timeoutId);

      console.log("📥 Registration response status:", res.status);

      // Handle network errors
      if (!res.ok) {
        let errorMessage = "Registration failed";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
          console.error("❌ Registration error:", errorMessage);
        } catch {
          errorMessage = res.statusText || errorMessage;
          console.error("❌ Registration error (no JSON):", res.statusText);
        }
        throw new Error(errorMessage);
      }

      const response = await res.json();
      console.log("✅ Registration successful:", response);

      // Save email for OTP verification
      sessionStorage.setItem("registeredEmail", email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("❌ Registration catch error:", error);
      
      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
      }
      
      // Improve error messages for network issues
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection or try again later.");
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
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      console.log("📤 Verifying OTP:", { email, apiUrl: `${API_BASE_URL}/api/auth/verify-otp` });

      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("📥 OTP verification response status:", res.status);

      // Handle network errors
      if (!res.ok) {
        let errorMessage = "OTP verification failed";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
          console.error("❌ OTP verification error:", errorMessage);
        } catch {
          errorMessage = res.statusText || errorMessage;
          console.error("❌ OTP verification error (no JSON):", res.statusText);
        }
        throw new Error(errorMessage);
      }

      const response = await res.json();
      console.log("✅ OTP verified successfully:", response);

      // Remove email from session storage after successful verification
      sessionStorage.removeItem("registeredEmail");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("❌ OTP verification catch error:", error);
      
      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error("Request timed out. Please try again.");
      }
      
      // Improve error messages for network issues
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection.");
      }
      
      throw error;
    }
  };


  // ============================================
  // RESEND OTP FUNCTION
  // ============================================
  const resendOtp = async (email: string) => {
    try {
      setLoading(true);
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      console.log("📤 Resending OTP:", { email, apiUrl: `${API_BASE_URL}/api/auth/resend-otp` });

      const res = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("📥 Resend OTP response status:", res.status);

      if (!res.ok) {
        let errorMessage = "Failed to resend OTP";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
          console.error("❌ Resend OTP error:", errorMessage);
        } catch {
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const response = await res.json();
      console.log("✅ OTP resent successfully:", response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("❌ Resend OTP catch error:", error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error("Request timed out. Please try again.");
      }
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection.");
      }
      
      throw error;
    }
  };

  // ============================================
  // LOGIN FUNCTION
  // ============================================
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      console.log("📤 Logging in user:", { email, apiUrl: `${API_BASE_URL}/api/auth/login` });

      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal, // Add timeout signal
      });

      clearTimeout(timeoutId);

      console.log("📥 Login response status:", res.status);

      // Handle network errors
      if (!res.ok) {
        let errorMessage = "Login failed";
        try {
          const response = await res.json();
          errorMessage = response.message || response.error || errorMessage;
          console.error("❌ Login error:", errorMessage);
        } catch {
          // If response is not JSON, use status text
          errorMessage = res.statusText || errorMessage;
          console.error("❌ Login error (no JSON):", res.statusText);
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

      console.log("✅ Login successful:", { email: user.email, role: user.role });

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
      console.error("❌ Login catch error:", error);
      
      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
      }
      
      // Improve error messages for network issues
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Unable to connect to server. Please check your internet connection or try again later.");
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
    resendOtp,
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
