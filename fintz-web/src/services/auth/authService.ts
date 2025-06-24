import { authRepository } from '../../repositories/authRepository';
import { UserLogin, UserRegister, User, AuthResponse } from '../../types';
// Não precisamos mais de setToken, clearToken, getToken diretamente aqui,
// pois as API Routes (controladores) farão isso, ou o middleware.
// import { setToken, clearToken, getToken } from '../../lib/cookies'; // Remover ou não usar diretamente aqui
import { NextRequest } from 'next/server'; // Para tipar `req` corretamente em validateSession

const TOKEN_COOKIE_KEY = process.env.NEXT_PUBLIC_TOKEN_COOKIE_KEY;

export const authService = {
  async register(userData: UserRegister): Promise<User> {
    return authRepository.register(userData);
  },

  // Novo método para login do lado do servidor (chamado pelas API Routes)
  async loginBackend(credentials: UserLogin): Promise<{ user: User; token: string }> {
    const authResponse = await authRepository.login(credentials);

    console.log("olhaa comcom veioooooo", authResponse)

    // Após obter o token, validamos ele para obter os dados do usuário.
    // Isso simula o comportamento de "obter os dados do usuário após o login".
    const user = await authRepository.validateToken(authResponse.access_token);
    return { user, token: authResponse.access_token };
  },

  // O logout não precisa mais de `res` aqui, pois a API Route fará a limpeza do cookie.
  async logout(): Promise<void> {
    // Nenhuma lógica de negócio de logout aqui, apenas um marcador
    // O que importa é que a API Route limpe o cookie.
  },

  // validateSession agora aceita NextRequest diretamente
  async validateSession(req: NextRequest): Promise<User | null> {
    const token = req.cookies.get(TOKEN_COOKIE_KEY || "auth_token")?.value; // Acessa o cookie diretamente de NextRequest
    if (!token) {
      return null;
    }
    try {
      const user = await authRepository.validateToken(token);
      return user;
    } catch (error) {
      console.error('Token inválido ou expirado:', error);
      return null;
    }
  },
};