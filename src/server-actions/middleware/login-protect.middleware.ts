import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { nextRedirect } from './utils/next-redirect';

export async function loginProtect(request: NextRequest) {
    const tokens = await getTokensFromRequest(request);
    if (!tokens) return NextResponse.next();

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) return NextResponse.next();

    return nextRedirect(AUTH_PAGE.HOME, request.url);
}
