import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth(); // or check localStorage directly if context isn't fully set

  const storedUser = user || JSON.parse(localStorage.getItem('user') || 'null');

  if (!storedUser) {
    return <Navigate to="/login/user" replace />;
  }

  if (adminOnly && storedUser.role !== 'admin' && !storedUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}