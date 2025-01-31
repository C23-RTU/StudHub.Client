import axios from 'axios';

import { BASE_API_URL } from '@/lib/config/api.config';

export const SERVER_AXIOS = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
