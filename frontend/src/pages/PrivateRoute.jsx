// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function PrivateRoute({ children }) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // You can also check for user role if needed, e.g. user.role === 'artist'
  return children;
}
