import { isProduction } from '../helpers/isProduction.helper';

export const BASE_API_URL = isProduction ? 'https://setka-rtu.ru/api' : 'https://localhost:3000/api';
