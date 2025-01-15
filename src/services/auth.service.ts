import { api } from '@/api/api';

import type { TAuthDataSchema } from '@/lib/types/auth.type';

class authService {
    private _auth = '/auth';

    async login(data: TAuthDataSchema) {
        return await api.post(`${this._auth}/login`, data);
    }
}

export const AuthService = new authService();
