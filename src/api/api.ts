import axios from 'axios';
import https from 'https';

export const BASE_API_URL = 'http://45.12.73.206/api';

export const API = axios.create({
    baseURL: BASE_API_URL,
    httpAgent: new https.Agent({
        keepAlive: true,
    }),
});
