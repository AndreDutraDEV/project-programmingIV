// src/shared/components/ProtectedPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/signin');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  if (!isClient || !authenticated) {
    return <p>Carregando...</p>; // ou null
  }

  return <>{children}</>;
}