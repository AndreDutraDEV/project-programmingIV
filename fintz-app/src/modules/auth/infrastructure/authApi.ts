// src/modules/auth/infrastructure/authApi.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  console.log("oolha a resposat", res);
  

  if (!res.ok) throw new Error('Falha no login');
  const data = await res.json();
  return data.access_token; // Assumindo estrutura de retorno
}

export async function registerUser(name: string, email: string, cell: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, cell})
  });

  if (!res.ok) throw new Error('Erro ao registrar usuário');
}