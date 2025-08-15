import type { NextRequest } from 'next/server';

import { EnumTokens } from '@/lib/types/login.type';

export async function getTokensFromRequest(request: NextRequest) {
    // let isRefresh = false;

    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
    const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

    if (!refreshToken || !accessToken) {
        request.cookies.delete(EnumTokens.ACCESS_TOKEN);
        request.cookies.delete(EnumTokens.REFRESH_TOKEN);

        return null;
    }

    return { refreshToken, accessToken };
}
