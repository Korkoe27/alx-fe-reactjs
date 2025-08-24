// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // 👈 assuming you have a useAuth hook

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // get auth state

  if (!user) {
    // if no user is logged in, redirect
    return <Navigate to="/login" replace />;
  }

  // otherwise, render the protected content
  return children;
};

export default ProtectedRoute;