import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { isAuthenticated, userRole } = useSelector((state: { auth: { isAuthenticated: boolean; userRole: string } }) => state.auth);
    const location = useLocation();

    if (!isAuthenticated || userRole !== role) {
        return <Navigate to={`/login/${role}`} state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;