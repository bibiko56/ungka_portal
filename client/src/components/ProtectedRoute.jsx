import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Guards a route: must be logged in (and an admin if adminOnly is set).
// Reads localStorage directly so it stays in sync with Navbar, which
// logs out by clearing localStorage rather than going through AuthContext.
export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    user = null;
  }
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = user.role === 'admin' || user.isAdmin === true;
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}