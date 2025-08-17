import { ClubCreationRequestsApi } from './axios-admin/api';
import { BASE_ADMIN_API } from './base-axios-instance';

export const clubCreationRequestsApi = new ClubCreationRequestsApi(undefined, undefined, BASE_ADMIN_API);
