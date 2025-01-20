'use server';

import { AxiosError } from 'axios';
import { jwtVerify } from 'jose';

export async function jwtVerifyServer(accessToken: string) {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload }: { payload: unknown } = await jwtVerify(accessToken, secretKey, {
            algorithms: ['HS256'],
            typ: 'JWT',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });

        return payload;
    } catch (error) {
        if (error instanceof AxiosError && error.code === 'ERR_JWT_EXPIRED') {
            console.log('Токен истек');
            return null;
        }

        console.log('Ошибка при верификации токена', error);
        return null;
    }
}
