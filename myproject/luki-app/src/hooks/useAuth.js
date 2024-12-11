import { useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        console.log('User logged in');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        console.log('User logged out');
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return { isAuthenticated, handleLogin, handleLogout };
};

export default useAuth;
