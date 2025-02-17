import type { TokenModel } from '@/api/axios-client';

import { SERVER_AXIOS } from '../server-axios';

export async function getNewTokens(refreshToken: string, accessToken: string) {
    const response = await SERVER_AXIOS.get<TokenModel>(`/auth/refreshTokens`, {
        headers: {
            Cookie: `refreshToken=${refreshToken};accessToken=${accessToken}`,
        },
    });
    return response.data;
}
