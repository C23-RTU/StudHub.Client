import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';

import { commentApi } from '@/api/api';
import type { CommentDetailDTO, PostDetailDTO } from '@/api/axios-client/models';

import { useCommentStore } from '../store/useComment.store';

import type { TCommentPayloadSchema } from '@/lib/types/comment.type';

export const useSendCommentAndReply = (
    post: PostDetailDTO,
    hasNextPage: boolean,
    reset: UseFormReset<TCommentPayloadSchema>,
) => {
    const commentForReply = useCommentStore((store) => store.commentForReply);
    const resetCommentForReply = useCommentStore((store) => store.resetCommentForReply);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['send-comment'],
        mutationFn: async (payload: TCommentPayloadSchema) => {
            if (commentForReply) {
                return (
                    await commentApi.commentsAddReply({
                        content: payload.content,
                        inReplyTo: payload.inReplyTo as number,
                    })
                ).data;
            } else {
                return (
                    await commentApi.commentsAddComment({
                        content: payload.content,
                        postId: payload.postId as number,
                    })
                ).data;
            }
        },
        onSuccess: (comment) => {
            queryClient.setQueryData(['fetch-post', post.id], () => {
                return { ...post, commentCount: post.commentCount + 1 };
            });

            // Добавляем новый комментарий к посту
            if (!comment.threadId && !hasNextPage) {
                queryClient.setQueryData(
                    ['fetch-post-comments', post.id],
                    (oldData: InfiniteData<CommentDetailDTO[], unknown>) => {
                        if (!oldData) return;
                        const lastPageIndex = oldData.pages.length - 1;
                        const lastPage = oldData.pages[lastPageIndex];
                        return {
                            pageParams: oldData.pageParams,
                            pages: [...oldData.pages.slice(0, lastPageIndex), [...lastPage, comment]],
                        };
                    },
                );
            }

            // Добавляем новый ответ на комментарий
            if (comment.inReplyTo !== null) {
                queryClient.setQueryData(
                    ['get-comment-replies', comment.threadId],
                    (oldData: InfiniteData<CommentDetailDTO[], unknown>) => {
                        if (!oldData) {
                            oldData = {
                                pageParams: [0],
                                pages: [[]],
                            };
                        }
                        const lastPageIndex = oldData.pages.length - 1;
                        const lastPage = oldData.pages[lastPageIndex];
                        return {
                            pageParams: oldData.pageParams,
                            pages: [...oldData.pages.slice(0, lastPageIndex), [...lastPage, comment]],
                        };
                    },
                );
            }

            resetAllData();
        },
        onError: async () => {
            const { toast } = await import('react-hot-toast');
            toast.error('Ошибка', {
                position: 'top-center',
            });
        },
    });

    const resetAllData = () => {
        reset({
            content: '',
            inReplyTo: null,
            postId: post.id,
        });
        resetCommentForReply();
    };

    return {
        ...mutation,
        resetAllData,
        commentForReply,
        resetCommentForReply,
    };
};
