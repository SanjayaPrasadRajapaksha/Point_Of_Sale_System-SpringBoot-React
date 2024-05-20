import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    jwtToken: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);

    // Functions for login and logout
    const login = (data) => {
        setIsAuthenticated(true);
        setJwtToken(data);
        localStorage.setItem("jwtToken", data);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setJwtToken(null);
        //   setUser(null);
        localStorage.removeItem('jwtToken');
        //   localStorage.removeItem('user');
    }
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsAuthenticated(true);
            setJwtToken(token);
        }
    }, []);
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            jwtToken,
            //    user,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
