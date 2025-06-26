import { apiFetch } from '../services/api';
import { UserLogin, UserRegister, AuthResponse, UserUpdateData, User } from '../types';

export const authRepository = {
    async register(userData: UserRegister): Promise<User> {
        const data = await apiFetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return data;
    },
    async updateProfile(userId: string, userData: UserUpdateData, token: string): Promise<User> {
        // Sua API Python pode ter uma rota como /api/users/{userId} com método PUT ou PATCH
        // Ajuste a URL e o método conforme sua API Python
        const data = await apiFetch(`/users/${userId}`, { // Exemplo de URL
            method: 'PUT', // Ou 'PATCH' dependendo da sua API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        return data;
    },
    async login(credentials: UserLogin): Promise<AuthResponse> {
        const data = await apiFetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return data; // Isso deve retornar { token: string, expires_at: number }
    },
    async validateToken(token: string): Promise<User> {                
        const data = await apiFetch('/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });        
        return data;
    },
};