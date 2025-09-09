import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/api/api';

export const useOwnedClubs = () => {
    const query = useQuery({
        queryKey: ['get-owned-clubs'],
        queryFn: async () => (await userApi.userGetOwnedClubs()).data,
        staleTime: 60 * 1000 * 1, // 1 минут,
    });

    return query;
};
