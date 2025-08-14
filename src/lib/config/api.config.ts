import { isProduction } from '../helpers/isProduction.helper';

export const BASE_API_URL = isProduction ? 'https://setka-rtu.ru/api' : 'https://localhost:3000/api';
export const BASE_ADMIN_API_URL = isProduction ? 'https://setka-rtu.ru/admin-api' : 'https://localhost:3000/admin-api';
