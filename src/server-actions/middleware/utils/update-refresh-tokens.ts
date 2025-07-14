import type { NextResponse } from 'next/server';

import { EnumTokens } from '@/lib/types/login.type';

export const updateRefreshTokens = (
    response: NextResponse,
    tokens: { accessToken: string; refreshToken: string; isRefresh: boolean }
) => {
    if (tokens.isRefresh) {
        response.cookies.set(EnumTokens.ACCESS_TOKEN, tokens.accessToken, {
            expires: Date.now() + 2592000000,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
        response.cookies.set(EnumTokens.REFRESH_TOKEN, tokens.refreshToken, {
            expires: Date.now() + 2592000000,
            secure: true,
            httpOnly: true,
            sameSite: 'none',
        });
    }

    return response;
};
