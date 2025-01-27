import axios from 'axios';
import https from 'https';

export const BASE_API_URL = 'https://setka-rtu.ru/api';

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
