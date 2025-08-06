import { z } from 'zod';

export const LoginDataSchema = z.object({
    email: z.string().email('Некорректный email').nonempty(''),
    password: z.string().nonempty('Необходимо ввести пароль'),
});

export type TLoginDataSchema = z.infer<typeof LoginDataSchema>;

export enum EnumTokens {
    ACCESS_TOKEN = 'AccessToken',
    REFRESH_TOKEN = 'RefreshToken',
}
