import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import https from 'https';

import { isClientSideRender } from '@/lib/helpers/isClientSideRender.helper';
import { getServerSideCookies } from '@/server-actions/getServerSideCookies';

export const BASE_AXIOS_CONFIG: CreateAxiosDefaults = {
    headers: {
        'Content-Type': 'application/json',
    },
    httpAgent: new https.Agent({
        keepAlive: true,
    }),
    withCredentials: true,
};

export const applyBaseInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(async (config) => {
        if (!isClientSideRender) {
            const { Cookie } = await getServerSideCookies();
            config.headers = config.headers || {};
            config.headers['Cookie'] = Cookie;
        }
        return config;
    });

    instance.interceptors.response.use((config) => {
        const statusCode = config.status;

        if (statusCode === 401) {
            location.reload();
        }

        return config;
    });
};
