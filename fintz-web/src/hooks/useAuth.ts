export { useAuth } from '@/contexts/AuthContext';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, UserLogin, UserRegister } from '../types';
// import { getCookieFromObject, getToken } from '@/lib/cookies';

// interface AuthContextType {
// 	user: User | null;
// 	isAuthenticated: boolean;
// 	login: (credentials: UserLogin) => Promise<void>;
// 	register: (userData: UserRegister) => Promise<void>;
// 	logout: () => void;
// 	isLoading: boolean;
// }

// export const useAuth = (): AuthContextType => {
// 	const [user, setUser] = useState<User | null>(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
// 	const [isLoading, setIsLoading] = useState<boolean>(true);
// 	const router = useRouter();

// 	const checkAuthStatus = useCallback(async () => {
// 		setIsLoading(true);
// 		const token = localStorage.getItem('fintz_auth_token');
// 		if (token) {
// 			try {

// 				console.log("como o token chegou", token);

// 				const response = await fetch('/api/auth/me', { // Chamada para uma API Route do Next.js
// 					headers: {
// 						'Authorization': `Bearer ${token}`
// 					}
// 				});
				
// 				if (response.ok) {
// 					const data = await response.json();
// 					console.log("oolh a resposta aqui em", data);
// 					// setUser(data.user);
// 					setIsAuthenticated(true);
// 				} else {
// 					localStorage.removeItem('fintz_auth_token');
// 					// setUser(null);
// 					setIsAuthenticated(false);
// 				}
// 			} catch (error) {
// 				console.error('Erro ao validar token no cliente:', error);
// 				localStorage.removeItem('fintz_auth_token');
// 				// setUser(null);
// 				setIsAuthenticated(false);
// 			}
// 		} else {
// 			console.log("estõa chegoi aqui");

// 			// setUser(null);
// 			setIsAuthenticated(false);
// 		}
// 		setIsLoading(false);
// 	}, []);

// 	useEffect(() => {
// 		checkAuthStatus();
// 	}, [checkAuthStatus]);

// 	useEffect(() => {
// 		if (user) {
// 			console.log("Usuário foi setado:", user);
// 		}
// 	}, [user]);

// 	const login = useCallback(async (credentials: UserLogin) => {
// 		setIsLoading(true);
// 		try {
// 			const response = await fetch('/api/auth/login', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(credentials),
// 			});

// 			if (response.ok) {
// 				const { user: userData, token } = await response.json();

// 				// const normalizedUser: User = {
// 				// 	id: String(userData.id),
// 				// 	name: userData.name,
// 				// 	email: userData.email,
// 				// 	cell: userData.cell
// 				// };

// 				console.log("Dados para setar o User", userData);
// 				setUser(userData);
// 				console.log("User depois de setar", user);

// 				setIsAuthenticated(true);
// 				localStorage.setItem('fintz_auth_token', token);
// 				router.push('/home');
// 			} else {
// 				const errorData = await response.json();
// 				throw new Error(errorData.message || 'Erro no login');
// 			}
// 		} catch (error: any) {
// 			console.error('Erro de login:', error.message);
// 			throw error;
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}, [router]);

// 	const register = useCallback(async (userData: UserRegister) => {
// 		setIsLoading(true);
// 		try {
// 			const response = await fetch('/api/auth/register', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(userData),
// 			});

// 			if (response.ok) {
// 				const newUser = await response.json();
// 				// Após o registro, podemos querer fazer o login automático ou redirecionar para a página de login
// 				// Para este exemplo, vamos redirecionar para o login
// 				router.push('/login');
// 				return newUser;
// 			} else {
// 				const errorData = await response.json();
// 				throw new Error(errorData.message || 'Erro no registro');
// 			}
// 		} catch (error: any) {
// 			console.error('Erro de registro:', error.message);
// 			throw error;
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}, [router]);

// 	const logout = useCallback(async () => {
// 		setIsLoading(true);
// 		try {
// 			await fetch('/api/auth/logout', { method: 'POST' });
// 			// setUser(null);
// 			setIsAuthenticated(false);
// 			localStorage.removeItem('fintz_auth_token'); // Remove do localStorage
// 			router.push('/login');
// 		} catch (error) {
// 			console.error('Erro ao fazer logout:', error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}, [router]);

// 	// console.log("teste", user, isAuthenticated, login, register, logout, isLoading);

// 	return { user, isAuthenticated, login, register, logout, isLoading };
// };