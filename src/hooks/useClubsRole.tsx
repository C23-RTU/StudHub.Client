import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/api/api';

import type { TypeClubRole } from '@/lib/enums/club-roles.enum';

/**
 * Хук для работы с ролями пользователя в клубах
 */
export const useClubsRole = () => {
    const query = useQuery({
        queryKey: ['get-club-roles'],
        queryFn: async () => (await userApi.userGetClubRoles()).data,
        staleTime: 60 * 1000 * 5, // кешируем данные на 5 минут,
    });

    /**
     * Функция для получения роли в клубе
     */
    const checkRole = (clubId: number): TypeClubRole | null => {
        const data = query.data as Record<TypeClubRole, number[]> | undefined;
        if (!data) return null;

        let role = null;

        const keys = Object.keys(data) as TypeClubRole[];
        keys.forEach((k) => {
            if (data[k].includes(clubId)) role = k;
        });

        return role;
    };

    return {
        query,
        checkRole,
    };
};
