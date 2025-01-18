import { z } from 'zod';

export const AuthDataSchema = z.object({
    email: z.string().email(''),
    password: z.string().nonempty(''),
});

export type TAuthDataSchema = z.infer<typeof AuthDataSchema>;

export enum EnumTokens {
    ACCESS_TOKEN = 'AccessToken',
    REFRESH_TOKEN = 'RefreshToken',
}
