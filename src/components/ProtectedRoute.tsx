import React, { useState, useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    api.me()
      .then((data) => {
        setAuth(data.authenticated);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (auth === null) {
    return <div>Loading...</div>;
  }
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
