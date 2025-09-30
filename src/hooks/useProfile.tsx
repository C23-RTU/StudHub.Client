import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/api/api';

/**
 * Данные об авторизованном пользователе в системе (api/user/personalDetails)
 */
export const useProfile = () => {
    return useQuery({
        queryKey: ['fetch-profile'],
        queryFn: async () => (await userApi.userGetPersonalDetails()).data,
        staleTime: 60 * 1000 * 5,
    });
};
