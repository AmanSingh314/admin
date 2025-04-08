import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Check for user object

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;