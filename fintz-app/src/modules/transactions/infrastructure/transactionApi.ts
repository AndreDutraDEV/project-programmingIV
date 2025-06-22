// src/modules/transactions/infrastructure/transactionApi.ts
import { Transaction } from '../domain/Transaction';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTransactions(): Promise<Transaction[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Token não encontrado, não será feita requisição de transações.');
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn('Endpoint /transactions não encontrado (404).');
        return [];
      } else if (res.status === 401) {
        console.warn('Usuário não autorizado (401). Verifique o token.');
        return [];
      } else {
        const msg = await res.text();
        console.error(`Erro na resposta da API: ${res.status} - ${msg}`);
        return [];
      }
    }

    const data = await res.json();
    return data.map(Transaction.fromJson);
  } catch (error: any) {
    // Captura falha de rede: servidor offline, URL errada, CORS, etc.
    console.error('Erro na requisição para /transactions:', error.message || error);
    return [];
  }
}

export async function createTransaction(data: {
  accountId: number;
  categoryId: number;
  amount: number;
  type: string;
  description: string;
}) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');

  try {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Erro ao criar transação: ${res.status} - ${message}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    throw error;
  }
}