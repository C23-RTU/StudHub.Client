import { zodResolver } from '@hookform/resolvers/zod';
import { m } from 'framer-motion';
import { CircleXIcon, SendHorizonalIcon } from 'lucide-react';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import type { PostDetailDTO } from '@/api/axios-client';

import { useSendCommentAndReply } from './hooks/useSendCommentAndReply';
import { CommentPayloadSchema, type TCommentPayloadSchema } from '@/lib/types/comment.type';

export function TextareaEditorComment({ post, hasNextPage }: { post: PostDetailDTO; hasNextPage: boolean }) {
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
            inReplyTo: null,
            postId: post.id,
        },
    });

    const { commentForReply, mutate, resetAllData, isPending } = useSendCommentAndReply(post, hasNextPage, reset);

    const sendCommentHandler: SubmitHandler<TCommentPayloadSchema> = (data) => {
        mutate(data);
    };

    useEffect(() => {
        if (!commentForReply) return;

        setValue('inReplyTo', commentForReply.id);
        setValue('content', `${commentForReply.personSummaryDTO.firstName}, `);
    }, [commentForReply, setValue]);

    return (
        <form
            onSubmit={handleSubmit(sendCommentHandler)}
            className="fixed left-0 right-0 bottom-0 max-w-[1024px] w-full mx-auto bg-bg px-2 shadow-2xl shadow-black"
        >
            {commentForReply && (
                <m.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex py-2 text-xs items-center px-3 gap-2"
                >
                    <div className="flex gap-1">
                        <p>ответ пользователю </p>
                        <p className="text-primary font-medium">{commentForReply.personSummaryDTO.firstName}</p>
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
