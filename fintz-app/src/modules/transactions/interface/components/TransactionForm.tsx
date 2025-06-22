'use client';

import { useState } from 'react';
import { useCreateTransaction } from '../../application/useCreateTransaction';
import { TransactionType } from '../../domain/Transaction';

interface FormData {
  accountId: number;
  categoryId: number;
  amount: number;
  type: TransactionType;
  description: string;
}

export default function TransactionForm() {
  const { submit } = useCreateTransaction();

  const [form, setForm] = useState<FormData>({
    accountId: 1,
    categoryId: 1,
    amount: 0,
    type: 'income',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Conversão para campos numéricos quando necessário
    const newValue =
      name === 'accountId' || name === 'categoryId' || name === 'amount'
        ? Number(value)
        : value;

    setForm({ ...form, [name]: newValue as any });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(form);
    alert('Transação criada com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="amount" value={form.amount} onChange={handleChange} type="number" />
      
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
        <option value="transfer">Transferência</option>
      </select>

      <input name="description" value={form.description} onChange={handleChange} placeholder="Descrição" />

      <button type="submit">Criar Transação</button>
    </form>
  );
}