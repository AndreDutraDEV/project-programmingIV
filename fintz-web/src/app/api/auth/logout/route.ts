import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';
import { clearToken } from '@/lib/cookies'; // Importe clearToken

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: 'Logout bem-sucedido' });
    clearToken(response); // Limpa o cookie na resposta
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Erro ao fazer logout' }, { status: 500 });
  }
}