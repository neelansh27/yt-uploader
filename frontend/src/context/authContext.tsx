// context/AuthContext.js
import React, { useState, useEffect, type FC } from 'react';
import { AuthContext } from "./useAuth.ts";

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/auth/current_user', {
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URL+'/api/auth/google';
    };

    const logout = () => {
        window.location.href = import.meta.env.VITE_BACKEND_URL+'/api/auth/google/logout';
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
