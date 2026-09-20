import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const RoleRoute = ({ allowedRoles = [], children }) => {
  const { role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect user to their own role's home page
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'COMPANY') return <Navigate to="/company/dashboard" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
