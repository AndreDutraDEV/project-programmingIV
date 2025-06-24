import { serialize, parse } from 'cookie';
import { NextResponse, NextRequest } from 'next/server'; // Importe NextRequest daqui
import { TOKEN_COOKIE_KEY } from './constants';

export const setCookie = (
  res: NextResponse,
  name: string,
  value: string,
  options: Record<string, unknown> = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options && typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge = options.maxAge / 1000;
  }

  // Next.js 13+ com App Router manipula headers de Set-Cookie de forma diferente em NextResponse.
  // Para API Routes, NextResponse.next().headers já é o suficiente.
  // Para Middleware, usa request.cookies.set.
  // Se for uma NextResponse tradicional (Pages Router), `res.setHeader` ainda funciona.
  // Para simplificar e focar no App Router, vamos ajustar a tipagem.
  // No caso de API Routes do App Router, `NextResponse` é o que se usa.
  // A maneira como você está passando `NextResponse.next().headers as any` não é o ideal para setar cookies.
  // Vamos simplificar o `setCookie` para focar em como cookies são setados com `NextResponse`.
};

// Nova função para obter cookies de NextRequest (Middleware e API Routes do App Router)
export const getCookieFromNextRequest = (req: NextRequest, name: string) => {
  return req.cookies.get(name)?.value;
};

// Nova função para obter cookies de um objeto de cookies (para testes ou casos específicos)
export const getCookieFromObject = (cookies: { [key: string]: string }, name: string) => {
  return cookies[name];
};

export const getToken = (req: NextRequest | { cookies: { [key: string]: string } }) => {
  if (req instanceof NextRequest) {
    return getCookieFromNextRequest(req, TOKEN_COOKIE_KEY);
  }
  // Se não for NextRequest, assume que é um objeto de cookies simples.
  return getCookieFromObject(req.cookies, TOKEN_COOKIE_KEY);
};

// Funções para setar/limpar token na resposta do servidor (usadas em API Routes)
export const setToken = (res: NextResponse, token: string) => {
  res.cookies.set(TOKEN_COOKIE_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

export const clearToken = (res: NextResponse) => {
  res.cookies.set(TOKEN_COOKIE_KEY, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    path: '/',
    maxAge: -1, // Expire imediatamente
  });
};