'use server';

import { cookies } from 'next/headers';

import { jwtVerifyServer } from '@/server-actions/middleware/utils/jwt-verify';

export async function getPersonIdFromToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('AccessToken')?.value;
        if (!token) {
            console.warn('Токен не найден в куках');
            return null;
        }

        const payload = await jwtVerifyServer(token);
        if (!payload) {
            return null;
        }
        const personId = payload.personId as string;
        if (!personId) {
            console.warn('personId не найден в токене');
            return null;
        }

        return personId;
    } catch (error) {
        console.error('Ошибка при получении ID пользователя из токена:', error);
        return null;
    }
}
