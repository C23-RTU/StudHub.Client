import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { commentApi } from '@/api/api';

// TODO: сделать универсальный хук из этого и использовать везде где нужна пагинация по скроллу
export const useInfinityComments = (post_id: number) => {
    const { ref, inView } = useInView();

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['fetch-post-comments', post_id],
        queryFn: async ({ pageParam }) => (await commentApi.commentsGetByPostId(post_id, pageParam)).data,
        initialPageParam: 0,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (!lastPage.length) return null;
            return lastPageParam + 1;
        },
        enabled: !!post_id,
    });

    useEffect(() => {
        if (inView && infiniteQuery.hasNextPage) {
            infiniteQuery.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, infiniteQuery.hasNextPage]);

    return {
        ref,
        infiniteQuery,
    };
};
