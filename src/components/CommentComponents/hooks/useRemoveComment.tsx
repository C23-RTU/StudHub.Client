import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { commentApi } from '@/api/api';
import type { CommentDetailDTO } from '@/api/axios-client';

import { useCommentStore } from '../store/useComment.store';

export const useRemoveComment = () => {
    const commentMoreSheet = useCommentStore((store) => store.commentMoreSheet);
    const closeCommentMoreSheet = useCommentStore((store) => store.closeCommentMoreSheet);

    const queryClient = useQueryClient();

    const findAndUpdateComment = useCallback(
        (oldData: InfiniteData<CommentDetailDTO[], unknown>, updateComment: CommentDetailDTO) => {
            const updateData = { pages: [...oldData.pages], pageParams: [...oldData.pageParams] };

            let isFindElement = false;
            for (let index = 0; index < updateData.pageParams.length; index++) {
                for (let itemIndex = 0; itemIndex < updateData.pages[index].length; itemIndex++) {
                    const element = updateData.pages[index][itemIndex];

                    if (element.id === updateComment.id) {
                        updateData.pages[index][itemIndex] = updateComment;
                        isFindElement = true;
                        break;
                    }
                }

                if (isFindElement) break;
            }

            return updateData;
        },
        []
    );

    const { mutate, isPending } = useMutation({
        mutationKey: ['delete-comment', commentMoreSheet?.id],
        mutationFn: async () => (await commentApi.commentsDelete(commentMoreSheet?.id as number)).data,
        onSuccess(updateComment: CommentDetailDTO) {
            if (!updateComment.threadId) {
                queryClient.setQueryData(
                    ['fetch-post-comments', commentMoreSheet?.postId],
                    (oldData: InfiniteData<CommentDetailDTO[], unknown>) => {
                        if (!oldData) return;

                        const updateData = findAndUpdateComment(oldData, updateComment);

                        return {
                            oldData,
                            ...updateData,
                        };
                    }
                );
            }

            if (updateComment.threadId) {
                queryClient.setQueryData(
                    ['get-comment-replies', commentMoreSheet?.threadId],
                    (oldData: InfiniteData<CommentDetailDTO[], unknown>) => {
                        if (!oldData) return;

                        const updateData = findAndUpdateComment(oldData, updateComment);

                        return {
                            oldData,
                            ...updateData,
                        };
                    }
                );
            }

            closeCommentMoreSheet();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return {
        mutate,
        isPending,
    };
};
