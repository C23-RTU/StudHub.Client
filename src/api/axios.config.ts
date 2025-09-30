import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import https from 'https';

import { authApi } from './api';
import { isClientSideRender } from '@/lib/helpers/isClientSideRender.helper';
import { getServerSideCookies } from '@/server-actions/getServerSideCookies';

let isRetryError = false;

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

    instance.interceptors.response.use(
        (config) => config,
        async (error) => {
            const originalRequest = error.config;

            if (error?.response?.status === 401 && !isRetryError) {
                isRetryError = true;
                try {
                    await authApi.authRefreshTokens();
                    return instance.request(originalRequest);
                } catch (err) {
                    console.warn('Не удалось обновить токен на клиенте = ', err);
                    await authApi.authLogout();
                }
            }

            throw error;
        }
    );
};
