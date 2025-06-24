import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserLogin, UserRegister } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: UserLogin) => Promise<void>;
  register: (userData: UserRegister) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    // No cliente, não temos acesso direto ao `res` para `authService.validateSession`.
    // Para validar a sessão no cliente, normalmente faríamos uma requisição para uma rota de API do Next.js
    // que por sua vez validaria o token com a API Python.
    // Ou, para simplificar aqui, podemos tentar obter o token diretamente do cliente (mas cuidado com XSS).
    // Uma abordagem mais segura seria usar getServerSideProps ou uma API Route para essa validação inicial.

    // Para fins deste exemplo e para o hook ser reativo no cliente,
    // vamos assumir que o token pode ser acessado (ex: via localStorage, ou um endpoint de API route que o retorna).
    // Para o escopo deste exemplo, vamos usar um método simplificado que não é o ideal para produção para validação do hook:
    const token = localStorage.getItem('fintz_auth_token'); // NOTA: Armazenar JWT em localStorage é vulnerável a XSS. HttpOnly cookies são preferíveis.
    if (token) {
      try {
        const response = await fetch('/api/auth/me', { // Chamada para uma API Route do Next.js
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('fintz_auth_token');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao validar token no cliente:', error);
        localStorage.removeItem('fintz_auth_token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async (credentials: UserLogin) => {
    setIsLoading(true);
    try {
      // Neste hook do lado do cliente, a autenticação precisará ser feita por uma API Route do Next.js
      // para que o cookie HttpOnly seja setado pelo servidor.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const { user: userData, token } = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('fintz_auth_token', token); // Armazena uma cópia no localStorage para uso no cliente (cuidado com segurança)
        router.push('/home');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }
    } catch (error: any) {
      console.error('Erro de login:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (userData: UserRegister) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        // Após o registro, podemos querer fazer o login automático ou redirecionar para a página de login
        // Para este exemplo, vamos redirecionar para o login
        router.push('/login');
        return newUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no registro');
      }
    } catch (error: any) {
      console.error('Erro de registro:', error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('fintz_auth_token'); // Remove do localStorage
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return { user, isAuthenticated, login, register, logout, isLoading };
};