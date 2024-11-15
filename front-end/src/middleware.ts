import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './app/lib/session';
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (isPublicRoute && session?.jwt && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  if (!session?.jwt && pathname !== '/auth/login' && pathname !== '/auth/register') {
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
