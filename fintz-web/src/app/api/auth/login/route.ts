import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';
import { setToken } from '@/lib/cookies'; // Importe setToken aqui

export async function POST(req: NextRequest) {
  try {

    const { email, password } = await req.json();
    
    // Cria uma resposta para o Next.js que poderemos manipular
    const response = NextResponse.json({ message: 'Login bem-sucedido' });

    const authData = await authService.loginBackend({ email, password }); // Nova função no authService
    
    setToken(response, authData.token); // Seta o cookie HttpOnly na resposta

    console.log("LOGOU E SETOU O TOKEN");
    
    return NextResponse.json({ message: 'Login bem-sucedido', user: authData.user, token: authData.token }, { status: 200 });

  } catch (error: any) {   
    return NextResponse.json({ message: error.message || 'Erro no login' }, { status: 401 });
  }
}