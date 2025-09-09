import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { usersApi } from '@/api/api';

export const useSearchClubUsers = (clubId: number, pageSize: number = 10) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    const query = useInfiniteQuery({
        queryKey: ['search-user-club', clubId, debouncedQuery, pageSize],
        queryFn: async ({ pageParam = 0 }) => {
            return (await usersApi.usersSearchClubSubscribers(clubId, debouncedQuery, pageParam, pageSize)).data;
        },
        initialPageParam: 0,
        enabled: debouncedQuery.length > 0,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (!(lastPage as [])?.length || (lastPage as []).length < pageSize) return null;
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => firstPageParam,
    });

    return {
        query,
        searchQuery,
        setSearchQuery,
    };
};
