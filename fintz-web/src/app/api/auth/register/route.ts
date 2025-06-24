import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const newUser = await authService.register(userData);
    return NextResponse.json({ message: 'Usuário registrado com sucesso', user: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Erro ao registrar usuário' }, { status: 500 });
  }
}