import { z } from 'zod';

export const AuthDataSchema = z.object({
    email: z.string().email(''),
    password: z.string().nonempty(''),
});

export type TAuthDataSchema = z.infer<typeof AuthDataSchema>;

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}
