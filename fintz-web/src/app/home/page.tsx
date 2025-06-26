'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';

export default function HomePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  console.log("Valor de usuario no homepage", user);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // O redirecionamento já acontece no useEffect
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Bem-vindo, {user?.name}!</h1>
      <p className="text-lg text-gray-600 mb-4">Seu email: {user?.email}</p>
      <p className="text-lg text-gray-600 mb-8">Seu celular: {user?.cell}</p>
      <Button onClick={logout}>Sair</Button>
      <Link href="/profile" className='mt-2'>
        <Button>Atualizar Perfil</Button>
      </Link>
    </div>
  );
}