'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function SigninPage() {
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      await register(data);
      // Redirecionamento é tratado pelo useAuth hook (para login após registro, por exemplo)
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar usuário.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <AuthForm type="register" onSubmit={handleSubmit} isLoading={isLoading} errorMessage={error} />
        <p className="text-center text-gray-500 text-xs mt-4">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-800">
            Faça login aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}