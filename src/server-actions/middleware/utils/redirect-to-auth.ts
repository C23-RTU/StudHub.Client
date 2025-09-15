import { type NextRequest } from 'next/server';

import { PUBLIC_PAGE } from '@/lib/config/routes.config';

import { nextRedirect } from './next-redirect';

export async function redirectToAuth(request: NextRequest) {
    const forwardedHost = request.headers.get('x-forwarded-host');

    console.log('x-forwarded-host =', forwardedHost);

    const host = (forwardedHost ?? request.headers.get('host'))?.replace(':3000', '');

    const returnUrl = new URL(request.url);
    returnUrl.host = host ?? returnUrl.host;

    return nextRedirect(PUBLIC_PAGE.AUTH('login', returnUrl.toString()), request.url);
}
