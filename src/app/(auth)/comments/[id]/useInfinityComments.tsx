import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { CommentService } from '@/services/comment.service';

export const useInfinityComments = (post_id: number) => {
    const { ref, inView } = useInView();

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['fetch-post-comments', post_id],
        queryFn: async ({ pageParam }) => await CommentService.getByPostId(post_id, pageParam),
        initialPageParam: 0,
        getNextPageParam: (_, __, lastPageParam) => {
            return lastPageParam + 1;
        },
        staleTime: Infinity,
    });

    useEffect(() => {
        if (inView && infiniteQuery.hasNextPage) {
            infiniteQuery.fetchNextPage();
        }
    }, [inView, infiniteQuery.hasNextPage]);

    return {
        ref,
        infiniteQuery,
    };
};
