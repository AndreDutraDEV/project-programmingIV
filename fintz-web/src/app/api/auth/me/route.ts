import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';
// Não precisamos importar getToken aqui, pois validateSession já o usa internamente com o NextRequest

export async function GET(req: NextRequest) {
  try {
    const user = await authService.validateSession(req); // Agora req é do tipo NextRequest
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Erro na API /api/auth/me:', error);
    return NextResponse.json({ message: error.message || 'Erro ao validar sessão' }, { status: 500 });
  }
}