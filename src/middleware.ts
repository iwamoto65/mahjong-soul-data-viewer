import { NextRequest, NextResponse } from 'next/server';

const allowedBasePath = '/game/latest';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === allowedBasePath || pathname === allowedBasePath + '/' || pathname.startsWith(allowedBasePath + '/')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/game/latest', request.url));
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
