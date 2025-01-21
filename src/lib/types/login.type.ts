import { z } from 'zod';

export const LoginDataSchema = z.object({
    email: z.string().email(''),
    password: z.string().nonempty(''),
});

export type TLoginDataSchema = z.infer<typeof LoginDataSchema>;

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}
