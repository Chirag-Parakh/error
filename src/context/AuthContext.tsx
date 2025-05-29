// src/context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface AuthContextType {
    loggedIn: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setLoggedIn(!!token);
        };
        checkLoginStatus();
    }, []);

    const login = async () => {
        await AsyncStorage.setItem('userToken', 'dummy_token');
        setLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
