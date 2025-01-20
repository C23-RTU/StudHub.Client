import axios from 'axios';

export const BASE_API_URL = 'https://45.12.73.206/api';

export const SERVER_AXIOS = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
