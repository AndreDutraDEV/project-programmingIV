// src/modules/auth/interface/components/AuthProvider.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored) setToken(stored);
    }, []);


    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
        router.push('/transactions'); // ✅ já envia para a listagem
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/signin');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    return ctx;
};
