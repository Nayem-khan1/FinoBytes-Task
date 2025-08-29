import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import type { RootState } from '../store/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { token, role: userRole } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!token || userRole !== role) {
        return <Navigate to={`/login/${role}`} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;