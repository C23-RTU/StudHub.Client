import { type QueryFunction, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteQueryOptions<T> {
    queryKey: (string | number)[];
    queryFn: QueryFunction<T, (string | number)[], number>;
    pageSize: number;
}

export function useInfinityScroll<T>({ queryKey, queryFn, pageSize }: InfiniteQueryOptions<T>) {
    const { ref, inView } = useInView();

    const infiniteQuery = useInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 0,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (!(lastPage as [])?.length || (lastPage as []).length < pageSize) return null;
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => firstPageParam,
    });

    useEffect(() => {
        if (inView && infiniteQuery.hasNextPage) {
            infiniteQuery.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return {
        ref,
        infiniteQuery,
    };
}
