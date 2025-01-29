'use server';

import { cookies } from 'next/headers';

import { isClientSideRender } from '@/lib/helpers/isClientSideRender.helper';
import { EnumTokens } from '@/lib/types/login.type';

interface IGetServerSideCookies {
    Cookie?: string;
    access?: string;
    refresh?: string;
}

export async function getServerSideCookies(): Promise<IGetServerSideCookies> {
    const response: IGetServerSideCookies = {};

    if (isClientSideRender) return response;

    response.access = (await cookies()).get(EnumTokens.ACCESS_TOKEN)?.value;
    response.refresh = (await cookies()).get(EnumTokens.REFRESH_TOKEN)?.value;
    response.Cookie = `refreshToken=${response.refresh};accessToken=${response.access}`;

    return response;
}
