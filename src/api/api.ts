import axios from 'axios';
import https from 'https';

export const BASE_API_URL = 'https://api.instantwebtools.net/v1';

export const API = axios.create({
    baseURL: BASE_API_URL,
    httpAgent: new https.Agent({
        keepAlive: true,
    }),
});
