import axios from 'axios';

import { BASE_ADMIN_API_URL, BASE_API_URL } from '@/lib/config/api.config';

import { BASE_AXIOS_CONFIG, applyBaseInterceptors } from './axios.config';

export const BASE_API = axios.create({
    baseURL: BASE_API_URL,
    ...BASE_AXIOS_CONFIG,
});

export const BASE_ADMIN_API = axios.create({
    baseURL: BASE_ADMIN_API_URL,
    ...BASE_AXIOS_CONFIG,
});

applyBaseInterceptors(BASE_API);
applyBaseInterceptors(BASE_ADMIN_API);
