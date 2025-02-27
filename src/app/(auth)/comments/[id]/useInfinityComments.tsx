import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { commentApi } from '@/api/api';

const PAGE_SIZE = 100;

// TODO: сделать универсальный хук из этого и использовать везде где нужна пагинация по скроллу
export const useInfinityComments = (post_id: number) => {
    const { ref, inView } = useInView();

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['fetch-post-comments', post_id],
        queryFn: async ({ pageParam }) => (await commentApi.commentsGetByPostId(post_id, 0, pageParam, PAGE_SIZE)).data,
        initialPageParam: 0,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (!lastPage.length || lastPage.length < PAGE_SIZE) return null;
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
};
