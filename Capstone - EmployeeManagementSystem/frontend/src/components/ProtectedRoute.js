import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useSelector((s) => s.auth);
  if (!token) return <Navigate to="/" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;