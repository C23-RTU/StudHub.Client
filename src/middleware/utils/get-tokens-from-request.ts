import { AxiosError } from 'axios';
import type { NextRequest } from 'next/server';

import { EnumTokens } from '@/lib/types/auth.type';
import { AuthService } from '@/services/auth.service';

export async function getTokensFromRequest(request: NextRequest) {
    const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
    let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

    if (!refreshToken) {
        request.cookies.delete(EnumTokens.ACCESS_TOKEN);
        return null;
    }

    if (!accessToken) {
        try {
            const data = await AuthService.getNewTokens(refreshToken);
            accessToken = data.accessToken;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 401) {
                    console.log('Не валидный токен');
                    request.cookies.delete(EnumTokens.ACCESS_TOKEN);
                }
            }

            request.cookies.delete(EnumTokens.REFRESH_TOKEN);
            return null;
        }
    }

    return { accessToken, refreshToken };
}
