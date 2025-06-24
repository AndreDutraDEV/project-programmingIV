'use client';

import { useState } from 'react';
import { loginUser } from '@/modules/auth/infrastructure/authApi';
import { useAuth } from '@/modules/auth/interface/components/AuthProvider';

export default function SigninPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(form.email, form.password);
      login(token);
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    // <SignInForm>

    // </SignInForm>

    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" value={form.email} onChange={handleChange} type="email" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" required />
      <button type="submit">Entrar</button>
    </form>
  );
}