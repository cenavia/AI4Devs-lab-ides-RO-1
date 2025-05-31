import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  // TODO: Implement actual authentication logic
  // For now, we'll assume the user is always authenticated
  // In a real app, you would check for auth token, user session, etc.
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
