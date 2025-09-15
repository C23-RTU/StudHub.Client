import { type NextRequest } from 'next/server';

import { PUBLIC_PAGE } from '@/lib/config/routes.config';

import { nextRedirect } from './next-redirect';

export async function redirectToAuth(request: NextRequest) {
    return nextRedirect(PUBLIC_PAGE.AUTH('login', request.url), request.url);
}
