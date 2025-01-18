import { api } from '@/api/api';

import type { ILoginResponse, TAuthDataSchema } from '@/lib/types/auth.type';

class authService {
    private _auth = '/auth';

    async login(data: TAuthDataSchema): Promise<ILoginResponse> {
        return (await api.post(`${this._auth}/login`, data)).data;
    }

    async getNewTokens(refreshToken: string) {
        const response = await api.post<ILoginResponse>(
            `${this._auth}/refreshTokens`,
            {},
            {
                headers: {
                    Cookie: `refreshToken=${refreshToken}`,
                },
            },
        );

        return response.data;
    }
}

export const AuthService = new authService();
