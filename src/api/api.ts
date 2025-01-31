import axios from 'axios';
import https from 'https';

import { BASE_API_URL } from '@/lib/config/api.config';

import { isClientSideRender } from '@/lib/helpers/isClientSideRender.helper';
import { getServerSideCookies } from '@/server-actions/getServerSideCookies';

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    httpAgent: new https.Agent({
        keepAlive: true,
    }),
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    if (!isClientSideRender) {
        const { Cookie } = await getServerSideCookies();
        config.headers['Cookie'] = Cookie;
    }

    return config;
});
