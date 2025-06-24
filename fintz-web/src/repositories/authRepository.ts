import { apiFetch } from '../services/api';
import { UserLogin, UserRegister, AuthResponse, User } from '../types';

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

        console.log("qual tokem", token);
        

        const data = await apiFetch('/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return data;
    },


};