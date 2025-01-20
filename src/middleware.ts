import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { PUBLIC_PAGE } from './lib/config/routes.config';
import { authorizationProtect } from './server-actions/middleware/authorization-protect.middleware';
import { loginProtect } from './server-actions/middleware/login-protect.middleware';

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (!pathname.includes(PUBLIC_PAGE.AUTH)) {
        return authorizationProtect(request);
    }

    if (pathname.includes(PUBLIC_PAGE.AUTH)) {
        return loginProtect(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|img|favicon.ico|sitemap.xml|robots.txt).*)'],
};
