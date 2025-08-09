import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const RoleBasedRoute = ({ children, role, fallback = '/' }) => {
    const userRole = getUserRole();

    if (userRole !== role) {
        return <Navigate to={fallback} replace />;
    }

    return children;
};

export default RoleBasedRoute;