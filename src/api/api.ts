import axios from 'axios';
// import { getCookie } from 'cookies-next';
import https from 'https';

// import { EnumTokens } from '@/lib/types/login.type';

export const BASE_API_URL = 'https://localhost:3000/api';
// 'https://45.12.73.206/api';

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    httpAgent: new https.Agent({
        keepAlive: true,
        rejectUnauthorized: false,
    }),
    withCredentials: true,
});

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
