import { type NextRequest, NextResponse } from 'next/server';

import { getTokensFromRequest } from './utils/get-tokens-from-request';
import { jwtVerifyServer } from './utils/jwt-verify';
import { redirectToAuth } from './utils/redirect-to-auth';

export async function authorizationProtect(request: NextRequest) {
    const tokens = await getTokensFromRequest(request);
    if (!tokens) return redirectToAuth(request);

    const verifiedData = await jwtVerifyServer(tokens.accessToken);
    if (!verifiedData) return redirectToAuth(request);

    return NextResponse.next();
}
