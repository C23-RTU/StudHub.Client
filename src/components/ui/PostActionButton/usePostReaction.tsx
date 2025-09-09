import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { reactionApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

export const usePostReaction = (post: PostDetailDTO) => {
    const queryClient = useQueryClient();

    const updatePostQueryHandler = useCallback(
        (oldData: InfiniteData<PostDetailDTO[], unknown>, newPost: PostDetailDTO) => {
            if (!oldData) return;

            const pages = oldData.pages.map((page) => {
                return page.map((post) => (post.id === newPost.id ? newPost : post));
            });

            return {
                pageParams: oldData.pageParams,
                pages,
            };
        },
        []
    );

    const { mutate } = useMutation({
        mutationKey: ['toggle-reaction'],
        mutationFn: async () => await reactionApi.reactionsToggleReaction(post.id),
        onError: async () => {
            const { toast } = await import('react-hot-toast');
            toast.error('Не удалось выставить лайк');
        },
        onSuccess() {
            const newPost: PostDetailDTO = {
                ...post,
                isUserReacted: !post.isUserReacted,
                reactionCount: post.isUserReacted ? post.reactionCount - 1 : post.reactionCount + 1,
            };

            queryClient.setQueryData(['fetch-post', post.id], () => newPost);
            queryClient.setQueryData(['fetch-feed-posts'], (oldData: InfiniteData<PostDetailDTO[], unknown>) => {
                return updatePostQueryHandler(oldData, newPost);
            });
            queryClient.setQueryData(
                ['fetch-club-posts', post.club.id],
                (oldData: InfiniteData<PostDetailDTO[], unknown>) => {
                    return updatePostQueryHandler(oldData, newPost);
                }
            );
        },
    });

    return {
        mutate,
    };
};
