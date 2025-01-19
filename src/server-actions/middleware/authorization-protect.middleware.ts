import { type NextRequest, NextResponse } from 'next/server';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { redirectToAuth } from './utils/redirect-to-auth';
import { EnumTokens } from '@/lib/types/auth.type';

export async function authorizationProtect(request: NextRequest) {
    const response = NextResponse.next();

    const tokens = await getTokensFromRequest(request);
    if (!tokens) return redirectToAuth(request);

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) return redirectToAuth(request);

    if (tokens.isRefresh) {
        response.cookies.set(EnumTokens.ACCESS_TOKEN, tokens.accessToken, { expires: Date.now() + 2592000000 }); // 30 дней
        response.cookies.set(EnumTokens.REFRESH_TOKEN, tokens.refreshToken, {
            expires: Date.now() + 2592000000,
            httpOnly: true,
        }); // 30 дней
    }

    return response;
}
