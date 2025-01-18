import axios from 'axios';
import https from 'https';

export const BASE_API_URL = 'https://45.12.73.206/api';

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
