import { authRepository } from '../../repositories/authRepository';
import { TOKEN_COOKIE_KEY } from '../../lib/constants'; // Continua sendo útil para o cookie, se for usado
import { UserLogin, UserRegister, User, AuthResponse } from '../../types';
import { NextRequest } from 'next/server'; // Para tipar `req` corretamente em validateSession

export const authService = {

  async register(userData: UserRegister): Promise<User> {
    return authRepository.register(userData);
  },

  async loginBackend(credentials: UserLogin): Promise<{ user: User; token: string }> {
    
    const authResponse = await authRepository.login(credentials);
    
    // Garante que o retorno user seja do tipo User
    const user: User = {
      id: String(authResponse.user.id),
      name: authResponse.user.name,
      email: authResponse.user.email,
      cell: authResponse.user.cell,
    };

    return { user: user, token: authResponse.access_token };
  },

  async logout(): Promise<void> {
    // A lógica de limpeza do cookie será tratada na API Route de logout.
  },

  async validateSession(req: NextRequest): Promise<User | null> {
    // Primeiro, tente obter o token do cabeçalho Authorization (para requisições vindas do cliente via fetch)
    const authHeader = req.headers.get('authorization');
    let token: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove "Bearer "
    } else {
      // Se não estiver no cabeçalho Authorization, tente obter do cookie (para middleware ou SSR/SSG)
      // Note que o `req.cookies` só contém os cookies que o navegador enviou.
      // Se o token foi setado como HttpOnly, ele DEVERIA estar aqui.
      // Mas se a chamada `/api/auth/me` do cliente NÃO ESTÁ ENVIANDO HttpOnly cookies (o que é o padrão para `fetch` se não configurado com `credentials: 'include'`),
      // então você só o verá se ele for um cookie normal ou se for um request direto do servidor (getServerSideProps/middleware).
      token = req.cookies.get(TOKEN_COOKIE_KEY)?.value || null;
    }

    if (!token) {
      console.log("Nenhum token encontrado na requisição.");
      return null;
    }

    try {
      const validatedUser = await authRepository.validateToken(token);
      // Garante que o retorno seja do tipo User
      const user: User = {
        id: String(validatedUser.id),
        name: validatedUser.name,
        email: validatedUser.email,
        cell: validatedUser.cell,
      };
      return user;
    } catch (error) {
      console.error('Erro ao validar token com a API Python:', error);
      return null;
    }
  },
};