import { NextRequest, type NextResponse } from 'next/server';

import { applySetCookie } from './apply-set-cookie';
import { getNewTokens } from '@/server-actions/actions/getRefreshTokens.action';

export const refreshTokens = async (
    request: NextRequest,
    response: NextResponse,
    tokens: { accessToken: string; refreshToken: string }
): Promise<boolean> => {
    try {
        const responseData = await getNewTokens(tokens.refreshToken, tokens.accessToken);

        console.log('Произошло обновление токенов');

        applySetCookie(request, response, responseData);

        return true;
    } catch {
        return false;
    }
};
