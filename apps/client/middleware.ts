
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib/constants';

export function middleware(request: NextRequest) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    // Protect /dashboard
    if (pathname.startsWith('/dashboard')) {
        if (!session) {
            const loginUrl = new URL('/sign-in', request.url);
            // Optional: Add redirect param to return after login
            // loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect /sign-in or /sign-up to /dashboard if already logged in
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
