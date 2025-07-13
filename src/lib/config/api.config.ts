import { isProduction } from '../helpers/isProduction.helper';

export const BASE_API_URL = isProduction ? 'https://api.setka-rtu.ru' : 'https://localhost:3000/api';
