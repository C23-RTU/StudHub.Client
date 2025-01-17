import type { NextRequest } from 'next/server';

import { EnumTokens } from '@/lib/types/auth.type';

export async function getTokensFromRequest(request: NextRequest) {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
    const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

    if (!refreshToken) {
        request.cookies.delete(EnumTokens.ACCESS_TOKEN);
        return null;
    } else if (!accessToken) {
        request.cookies.delete(EnumTokens.REFRESH_TOKEN);
        return null;
    }

    return { accessToken, refreshToken };
}
