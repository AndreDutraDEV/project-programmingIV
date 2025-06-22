import { useEffect, useState } from 'react';
import { getTransactions } from '../infrastructure/transactionApi';
import { Transaction } from '../domain/Transaction';

export function useListTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token não encontrado. Usuário não autenticado.');
      setLoading(false);
      return;
    }

    async function loadTransactions() {
      setLoading(true);
      const result = await getTransactions();
      setTransactions(result);
      setLoading(false);
    }

    loadTransactions();
  }, []);

  return { transactions, loading };
}
