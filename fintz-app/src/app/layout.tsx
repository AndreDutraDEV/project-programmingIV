// src/app/layout.tsx

import './globals.css';
import { AuthProvider } from '@/modules/auth/interface/components/AuthProvider';

export const metadata = {
  title: 'Finance App',
  description: 'Controle de transações financeiras',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}