import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from './../lib/cookies'; // Importar getToken (para uso no servidor)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ['/login', '/signin'];
  const isPublicPath = publicPaths.includes(pathname);

  const token = request.cookies.get('fintz_auth_token')?.value;

  if (isPublicPath && token) {
    // Se o usuário está nas páginas públicas e já tem um token, redireciona para a home
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!isPublicPath && !token) {
    // Se o usuário está em uma página protegida e não tem token, redireciona para o login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Aplica o middleware a todas as rotas, exceto estáticas e API
};