'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      await login(data);
      // Redirecionamento é tratado pelo useAuth hook
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleSubmit} isLoading={isLoading} errorMessage={error} />
        <p className="text-center text-gray-500 text-xs mt-4">
          Não tem uma conta?{' '}
          <Link href="/signin" className="text-blue-500 hover:text-blue-800">
            Crie uma aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}