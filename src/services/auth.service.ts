import { api } from '@/api/api';

import type { TLoginDataSchema } from '@/lib/types/login.type';
import type { TRegisterDataSchema } from '@/lib/types/register.type';

class authService {
    private _auth = '/auth';

    async login(data: TLoginDataSchema) {
        return await api.post(`${this._auth}/login`, data);
    }

    async register(data: TRegisterDataSchema) {
        return await api.post(`${this._auth}/register`, data);
    }
}

export const AuthService = new authService();
