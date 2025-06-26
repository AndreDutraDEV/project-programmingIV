'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserLogin, UserRegister, UserUpdateData } from '@/types';
import { getToken } from '@/lib/cookies';

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (credentials: UserLogin) => Promise<void>;
	register: (userData: UserRegister) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	updateUser: (updatedUserData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const updateUser = useCallback((updatedUserData: User) => {
		setUser(updatedUserData);
	}, []);

	const checkAuthStatus = useCallback(async () => {
		const token = localStorage.getItem('fintz_auth_token');
		if (token) {
			try {
				const response = await fetch('/api/auth/me', {
					headers: { 'Authorization': `Bearer ${token}` }
				});

				if (response.ok) {
					const data = await response.json();
					console.log("resultadooo", data);
					setUser(data);
					setIsAuthenticated(true);
				} else {
					// localStorage.removeItem('fintz_auth_token');
				}
			} catch (err) {
				// localStorage.removeItem('fintz_auth_token');
			}
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	const login = async (credentials: UserLogin) => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials)
			});

			if (response.ok) {
				const { user: userData, token } = await response.json();
				setUser(userData);
				setIsAuthenticated(true);
				localStorage.setItem('fintz_auth_token', token);
				router.push('/home');
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (userData: UserRegister) => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData)
			});

			if (response.ok) {
				router.push('/login');
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		await fetch('/api/auth/logout', { method: 'POST' });
		setUser(null);
		setIsAuthenticated(false);
		localStorage.removeItem('fintz_auth_token');
		router.push('/login');
		setIsLoading(false);
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, isLoading, updateUser}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
};
