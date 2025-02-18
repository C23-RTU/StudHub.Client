import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/components/Provider/getQueryClient';

import { reactionApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

export const usePostReaction = (post: PostDetailDTO) => {
    const { mutate } = useMutation({
        mutationKey: ['toggle-reaction'],
        mutationFn: async () => await reactionApi.reactionsToggleReaction(post.id),
        onError: async (error) => {
            console.log(error);
            const { toast } = await import('react-hot-toast');
            toast.error('Не удалось выставить лайк');
        },
        onSuccess() {
            const newPost: PostDetailDTO = {
                ...post,
                isUserReacted: !post.isUserReacted,
                reactionCount: post.isUserReacted ? post.reactionCount - 1 : post.reactionCount + 1,
            };

            queryClient.setQueryData(
                ['fetch-posts-list'],
                (oldData: PostDetailDTO[] | null) => oldData && oldData.map((p) => (p.id === post.id ? newPost : p)),
            );
            queryClient.setQueryData(['fetch-post', post.id], () => newPost);
        },
    });

    return {
        mutate,
    };
};
