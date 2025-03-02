import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { commentApi } from '@/api/api';
import type { CommentDetailDTO } from '@/api/axios-client/models';

const PAGE_SIZE = 10;

export const useCommentReplies = (comment: CommentDetailDTO) => {
    const queryClient = useQueryClient();
    const [isOpenMoreReplies, setIsOpenMoreReplies] = useState(false);

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['get-comment-replies', comment.id],
        queryFn: async ({ pageParam }) =>
            (await commentApi.commentsGetThreadById(comment.id, pageParam, PAGE_SIZE)).data,
        initialPageParam: 0,
        getNextPageParam: (lastPage, __, lastPageParam) => {
            if (!lastPage.length || lastPage.length < PAGE_SIZE) return null;
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => firstPageParam,
        enabled: isOpenMoreReplies,
    });

    const openMoreReplies = () => {
        setIsOpenMoreReplies(!isOpenMoreReplies);
    };

    useEffect(() => {
        return () => {
            queryClient.removeQueries({ queryKey: ['get-comment-replies', comment.id], exact: true });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isOpenMoreReplies,
        setIsOpenMoreReplies,
        openMoreReplies,
        ...infiniteQuery,
    };
};
