import { useState } from 'react';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export function useFetch<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, options: FetchOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (options.requiresAuth) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Usuário não autenticado');
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Erro ${response.status}`);
      }

      const json = await response.json();
      setData(json);
      return json;
    } catch (err: any) {
      console.error('Erro na requisição:', err);
      setError(err.message || 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}