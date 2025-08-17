import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { nextRedirect } from './utils/next-redirect';
import { refreshTokens } from './utils/refresh-tokens';

export async function loginProtect(request: NextRequest) {
    const response = NextResponse.next();

    const tokens = await getTokensFromRequest(request);
    if (!tokens) return NextResponse.next();

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) {
        const status = await refreshTokens(request, response, tokens);

        if (!status) return NextResponse.next();
    }

    return nextRedirect(AUTH_PAGE.HOME, request.url);
}
