import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserInfo, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/loginform' }) => {
    const userInfo = getUserInfo();
    const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
        const roleRedirects = {
            admin: '/dashboard',
            security: '/security/dashboard',
            tenant: '/resident/dashboard'
        };
        return <Navigate to={roleRedirects[userInfo.role] || '/loginform'} replace />;
    }

    return children;
};

export default ProtectedRoute;
