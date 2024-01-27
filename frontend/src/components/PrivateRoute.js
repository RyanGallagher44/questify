import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

const PrivateRoute = ({children}) => {
    // const { authToken } = useAuth();
    return localStorage.getItem('authToken') ? <>{children}</> : <Navigate to="/home" />;
};

export default PrivateRoute;
