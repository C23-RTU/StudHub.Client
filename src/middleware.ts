import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { authorizationProtect } from './server-actions/middleware/authorization-protect.middleware';
import { loginProtect } from './server-actions/middleware/login-protect.middleware';

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (!pathname.includes('/auth')) {
        return authorizationProtect(request);
    }

    if (pathname.includes('/auth')) {
        return loginProtect(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt).*)'],
};
