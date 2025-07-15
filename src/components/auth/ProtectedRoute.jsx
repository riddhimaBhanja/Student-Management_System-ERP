import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  if (!isAuthenticated()) {
    toast.error('You need to be logged in to access this page.');
    return <Navigate to="/login" replace />;
  }

  if (roles && !hasRole(roles)) {
    toast.error('You do not have the necessary permissions to access this page.');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;