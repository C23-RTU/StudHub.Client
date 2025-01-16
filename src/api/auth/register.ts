import type { NextApiRequest } from 'next';
import { registerSchema } from '@/schemas/registerSchema';
import { API, BASE_API_URL } from '@/api/api';

export async function POST(req: NextApiRequest) {
    try {
        const data = registerSchema.parse(req.body);

        const response = await API.post(`${BASE_API_URL}/auth/register`, data).catch((error) => {
            console.error("Ошибка при отправке запроса:", error);
        });

        console.log('Регистрация успешна', response);
    } catch (error: any) {
        console.log(error);
    }
}
