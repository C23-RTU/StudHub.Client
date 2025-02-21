import { zodResolver } from '@hookform/resolvers/zod';
import { type InfiniteData, type UseInfiniteQueryResult, useMutation } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { CircleXIcon, SendHorizonalIcon } from 'lucide-react';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { commentApi } from '@/api/api';
import type { CommentDetailDTO, PostDetailDTO } from '@/api/axios-client';

import { queryClient } from '../Provider/getQueryClient';

import { useCommentStore } from './useComment.store';
import { CommentPayloadSchema, type TCommentPayloadSchema } from '@/lib/types/comment.type';

export function TextareaEditorComment({ post }: { post: PostDetailDTO }) {
    const commentForReply = useCommentStore((store) => store.commentForReply);
    const resetCommentForReply = useCommentStore((store) => store.resetCommentForReply);

    const {
        handleSubmit,
        reset,
        setValue,
        register,
        formState: { isValid },
    } = useForm<TCommentPayloadSchema>({
        mode: 'onChange',
        resolver: zodResolver(CommentPayloadSchema),
        defaultValues: {
            parentId: null,
            postId: post.id,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['send-comment'],
        mutationFn: async (payload: TCommentPayloadSchema) => (await commentApi.commentsAdd(payload)).data,
        onSuccess: (comment) => {
            queryClient.setQueryData(['fetch-post', post.id], () => {
                return { ...post, commentCount: post.commentCount + 1 };
            });

            queryClient.setQueryData(['fetch-post-comments', post.id], (data: InfiniteData<CommentDetailDTO[], unknown>) => {
                const lastPage = data.pages.splice(data.pages.length - 1, 1).pop();
                lastPage?.push(comment);
                const newPagesWithoutLast = data.pages.slice(0, data.pages.length - 2);

                return {
                    pageParams: data.pageParams,
                    pages: [
                        newPagesWithoutLast,
                        lastPage
                    ],
                };
            });

            resetAllData();
        },
        onError: async () => {
            const { toast } = await import('react-hot-toast');
            toast.error('Ошибка', {
                position: 'top-center',
            });
        },
    });

    const sendCommentHandler: SubmitHandler = (data) => {
        mutate(data);
    };

    const resetAllData = () => {
        reset({
            content: '',
            parentId: null,
            postId: post.id,
        });
        resetCommentForReply();
    };

    useEffect(() => {
        if (!commentForReply) return;

        const parentIdValue =
            commentForReply.parentId !== null ? (commentForReply.parentId as number) : commentForReply.id;

        setValue('parentId', parentIdValue);
        setValue('content', `${commentForReply.personDetailDTO.firstName}, `);
    }, [commentForReply, setValue]);

    return (
        <form
            onSubmit={handleSubmit(sendCommentHandler)}
            className="fixed left-0 right-0 bottom-0  bg-bg px-2 shadow-2xl shadow-black"
        >
            {commentForReply && (
                <m.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex py-2 text-xs items-center px-3 gap-2"
                >
                    <div className="flex gap-1">
                        <p>ответ пользователю </p>
                        <p className="text-primary font-medium">{commentForReply.personDetailDTO.firstName}</p>
                    </div>
                    <button type="button" onClick={resetAllData}>
                        <CircleXIcon size={15} className="text-gray-400" />
                    </button>
                </m.div>
            )}

            <div className="flex gap-1 items-center">
                <Textarea
                    rows={2}
                    className="resize-none focus-visible:ring-inset focus-visible:ring-0 text-sm h-auto border-none shadow-none"
                    placeholder="Комментарий"
                    {...register('content')}
                />
                <Button className="h-[40px] w-[40px] rounded " type="submit" disabled={!isValid} isLoading={isPending}>
                    <SendHorizonalIcon />
                </Button>
            </div>
        </form>
    );
}
