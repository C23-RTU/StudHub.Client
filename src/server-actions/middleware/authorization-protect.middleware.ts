import { type NextRequest, NextResponse } from 'next/server';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { redirectToAuth } from './utils/redirect-to-auth';
import { updateRefreshTokens } from './utils/update-refresh-tokens';

export async function authorizationProtect(request: NextRequest) {
    const response = NextResponse.next();

    const tokens = await getTokensFromRequest(request);
    if (!tokens) return redirectToAuth(request);

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) return redirectToAuth(request);

    updateRefreshTokens(response, tokens);

    return response;
}
