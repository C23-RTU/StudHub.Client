import type { NextRequest } from 'next/server';

import { jwtVerifyServer } from './jwt-verify';
import { EnumTokens } from '@/lib/types/login.type';
import { getNewTokens } from '@/server-actions/actions/getRefreshTokens.action';

export async function getTokensFromRequest(request: NextRequest) {
    let isRefresh = false;

    let refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
    let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

    if (!refreshToken || !accessToken) {
        request.cookies.delete(EnumTokens.ACCESS_TOKEN);
        request.cookies.delete(EnumTokens.REFRESH_TOKEN);

        return null;
    }

    const verifiedData = await jwtVerifyServer(accessToken);

    if (!verifiedData) {
        try {
            const data = await getNewTokens(refreshToken, accessToken);
            console.log('Произошло обновление токенов');

            refreshToken = data.refreshToken;
            accessToken = data.accessToken;

            isRefresh = true;
        } catch {
            request.cookies.delete(EnumTokens.ACCESS_TOKEN);
            request.cookies.delete(EnumTokens.REFRESH_TOKEN);
            return null;
        }
    }

    return { accessToken, refreshToken, isRefresh };
}
