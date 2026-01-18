import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role?: "student" | "employee" | "admin" | "super_admin";
};

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Still loading auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (role) {
    // Allow super_admin for admin routes
    if (role === 'admin' && (user.role === 'admin' || user.role === 'super_admin')) {
      return <>{children}</>;
    }
    // For other roles, match exactly
    if (user.role !== role) {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
