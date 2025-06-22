'use client';

import { useState } from 'react';
import { registerUser } from '@/modules/auth/infrastructure/authApi';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', name: '', cell: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form.name, form.email, form.cell, form.password);
      router.push('/transactions');
    } catch (err) {
      alert('Erro ao registrar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input name="name" value={form.name} onChange={handleChange} type="text" required />
      <input name="email" value={form.email} onChange={handleChange} type="email" required />
      <input name="cell" value={form.cell} onChange={handleChange} type="text" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
