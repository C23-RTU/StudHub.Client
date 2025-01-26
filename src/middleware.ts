import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// import { PUBLIC_PAGE } from './lib/config/routes.config';
import { authorizationProtect } from './server-actions/middleware/authorization-protect.middleware';
import { localAuthenticationApi } from './server-actions/middleware/local-authentication-api.middleware';
import { loginProtect } from './server-actions/middleware/login-protect.middleware';

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    // if (process.env.NODE_ENV === 'development') return NextResponse.next();

    if (pathname.includes('/api')) {
        return localAuthenticationApi(request);
    }

    if (!pathname.includes('/auth')) {
        return authorizationProtect(request);
    }

    if (pathname.includes('/auth')) {
        return loginProtect(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt).*)'],
};
