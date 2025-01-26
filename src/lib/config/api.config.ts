import { isProduction } from '../isProduction';

export const BASE_API_URL = isProduction ? 'https://setka-rtu.ru/api' : 'https://localhost:3000/api';
