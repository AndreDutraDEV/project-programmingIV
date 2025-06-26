import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/auth/authService';
import { TOKEN_COOKIE_KEY } from '@/lib/constants'; // Para obter o token do cookie, se necessário

// Rota para atualizar dados do usuário
export async function PUT(
  req: NextRequest
) {
  try {
    // Captura o userId da query string (?userId=...)
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ message: 'userId não informado na query string.' }, { status: 400 });
    }    

    const userData: Record<string, any> = await req.json(); // Dados a serem atualizados

    // Extrair o token do cabeçalho Authorization
    const authHeader = req.headers.get('authorization');
    let token: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Fallback: tentar obter o token do cookie se não estiver no Bearer (menos comum para PUT/PATCH)
      token = req.cookies.get(TOKEN_COOKIE_KEY)?.value || null;
    }

    if (!token) {
      token = localStorage.getItem(TOKEN_COOKIE_KEY);
    }

    if (!token) {
      return NextResponse.json({ message: 'Não autorizado: Token não encontrado.' }, { status: 401 });
    }

    // O ideal seria verificar se o `userId` na URL corresponde ao ID do usuário do token
    const authenticatedUser = await authService.validateSession(req);
    if (!authenticatedUser || authenticatedUser.id !== userId) {
      return NextResponse.json({ message: 'Não autorizado: Usuário não tem permissão para esta ação.' }, { status: 403 });
    }

    const updatedUser = await authService.updateProfile(userId, userData, token);

    return NextResponse.json({ message: 'Perfil atualizado com sucesso', user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error('Erro na API /api/users:', error);
    return NextResponse.json({ message: error.message || 'Erro ao atualizar perfil' }, { status: 500 });
  }
}
