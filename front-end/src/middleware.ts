import { NextRequest, NextResponse } from 'next/server';
import { getProfile } from './app/actions/get-profile';
import { setSession } from './app/lib/session';
const isPublicRoute = ['/auth/login', '/auth/register'];
export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  if (!isPublicRoute.includes(pathname)) {
    // Check authentication
    const accessToken = request.cookies.get('session')?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    //verify token
    const { data: userProfile, success } = await getProfile(accessToken);
    if (!success) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    // if (userProfile?.role === 'admin') {
    //   return NextResponse.redirect(new URL('/admin', request.url));
    // } else if (userProfile?.role === 'user') {
    //   return NextResponse.redirect(new URL('/', request.nextUrl));
    // }
    // if (userProfile?.role !== 'admin' && pathname === '/admin') {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
    // if (userProfile?.role === 'user') {
    //   return NextResponse.redirect(new URL('/admin', request.url));
    // }
    // if (userProfile?.role === 'admin') {
    //   return NextResponse.redirect(new URL('/admin', request.url));
    // }
    await setSession(accessToken, userProfile);
  }
};
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
