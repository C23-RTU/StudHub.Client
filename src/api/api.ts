import axios from 'axios';
import https from 'https';

import { BASE_API_URL } from '@/lib/config/api.config';

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
