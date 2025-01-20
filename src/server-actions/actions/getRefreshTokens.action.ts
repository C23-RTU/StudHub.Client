import { SERVER_AXIOS } from '../server-axios';

import type { ILoginResponse } from '@/lib/types/auth.type';

export async function getNewTokens(refreshToken: string, accessToken: string) {
    const response = await SERVER_AXIOS.get<ILoginResponse>(`/auth/refreshTokens`, {
        headers: {
            Cookie: `refreshToken=${refreshToken};accessToken=${accessToken}`,
        },
    });

    return response.data;
}
