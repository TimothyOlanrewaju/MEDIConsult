import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if access token exists
    const navigate = useNavigate()

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    navigate('/login')  // Redirect to login if not authenticated
                )
            }
        />
    );
};

export default ProtectedRoute;
