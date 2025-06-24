import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';
import { setToken } from '@/lib/cookies'; // Importe setToken aqui

export async function POST(req: NextRequest) {
  try {

    const { email, password } = await req.json();

    console.log("ele executou isso aqui em", email, password);
    

    // Cria uma resposta para o Next.js que poderemos manipular
    const response = NextResponse.json({ message: 'Login bem-sucedido' });

    // Chama o serviço de login, que agora precisa retornar o token E os dados do usuário.
    // O service.login não vai mais setar o cookie, a API Route fará isso.
    const authData = await authService.loginBackend({ email, password }); // Nova função no authService

    setToken(response, authData.token); // Seta o cookie HttpOnly na resposta

    // Inclua os dados do usuário na resposta para o cliente
    return NextResponse.json({ message: 'Login bem-sucedido', user: authData.user, token: authData.token }, { status: 200 });

  } catch (error: any) {
    console.log("caoi foi nesse", error.message);
    
    return NextResponse.json({ message: error.message || 'Erro no login' }, { status: 401 });
  }
}