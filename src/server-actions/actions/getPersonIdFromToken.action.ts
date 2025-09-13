'use server';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function getPersonIdFromToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('AccessToken')?.value;
        if (!token) {
            console.warn('Токен не найден в куках');
            return null;
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secretKey);
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
