import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { nextRedirect } from './utils/next-redirect';
import { EnumTokens } from '@/lib/types/auth.type';

export async function loginProtect(request: NextRequest) {
    const response = NextResponse.next();

    const tokens = await getTokensFromRequest(request);
    if (!tokens) return NextResponse.next();

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) return NextResponse.next();

    if (tokens.isRefresh) {
        response.cookies.set(EnumTokens.ACCESS_TOKEN, tokens.accessToken, { expires: Date.now() + 2592000000 }); // 30 дней
        //TODO: надо бы подумать как ставить httpOnly, так как при входе токены выставляются на клиенте,
        // без возможности установить httpOnly
        response.cookies.set(EnumTokens.REFRESH_TOKEN, tokens.refreshToken, {
            expires: Date.now() + 2592000000,
        }); // 30 дней
    }

    return nextRedirect(AUTH_PAGE.HOME, request.url);
}
