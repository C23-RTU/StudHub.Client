import axios from 'axios';

export const BASE_API_URL = 'https://setka-rtu.ru/api';

export const SERVER_AXIOS = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
