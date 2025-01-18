import { z } from 'zod';

export const LoginDataSchema = z.object({
    email: z.string().email(''),
    password: z.string().nonempty(''),
});

export type TLoginDataSchema = z.infer<typeof LoginDataSchema>;

export enum EnumTokens {
    ACCESS_TOKEN = 'AccessToken',
    REFRESH_TOKEN = 'RefreshToken',
}
