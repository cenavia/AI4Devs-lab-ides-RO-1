import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy loading for better performance
const Home = React.lazy(() => import("../features/products/components/Home"));
const Login = React.lazy(() => import("../features/auth/components/Login"));

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};
