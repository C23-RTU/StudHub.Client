import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

/**
 * Данные об авторизованном пользователе в системе (api/user/personalDetails)
 */
export const useProfile = (initData?: PersonDetailDTO) => {
    const profileData = useQuery({
        queryKey: ['fetch-profile'],
        queryFn: async () => (await userApi.userGetPersonalDetails()).data,
        staleTime: 60 * 1000 * 5, // кешируем данные о пользователе на 5 минут,
        initialData: initData,
    });

    return profileData;
};
