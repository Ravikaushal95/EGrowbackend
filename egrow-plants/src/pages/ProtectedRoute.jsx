import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('role');
  const userData = JSON.parse(localStorage.getItem('data'));
  const isLoggedIn = userData && userData.email;

  if (!isLoggedIn) {
    // Redirect based on role type
    return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
