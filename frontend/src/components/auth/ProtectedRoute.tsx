import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isRestoring } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isRestoring) {
    return <div role="status" aria-live="polite">Restoring your session…</div>;
  }

  if (!user) {
    // Redirect to login but save the current location to return to after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
