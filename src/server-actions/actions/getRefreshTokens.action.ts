import { SERVER_AXIOS } from '../server-axios';

import type { ILoginResponse } from '@/lib/types/auth.type';

// Серверный запрос в котором нельзя прописать rejectUnauthorized для игнорирования сертификата
// Нужно переписать на fetch
export async function getNewTokens(refreshToken: string) {
    const response = await SERVER_AXIOS.get<ILoginResponse>(`/auth/refreshTokens`, {
        headers: {
            Cookie: `refreshToken=${refreshToken}`,
        },
    });

    return response.data;
}
