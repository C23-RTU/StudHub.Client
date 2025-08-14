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
        setValue('content', `${commentForReply.personSummary.firstName}, `);
    }, [commentForReply, setValue]);

    return (
        <form
            onSubmit={handleSubmit(sendCommentHandler)}
            className="border-border bg-background-light fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[600px] border-x border-t-1 lg:px-0"
        >
            {commentForReply && (
                <m.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="ml-2 flex items-center gap-2 px-3 py-2 text-xs"
                >
                    <div className="flex gap-1">
                        <p>ответ пользователю </p>
                        <p className="text-primary font-medium">{commentForReply.personSummary.firstName}</p>
                    </div>
                    <button type="button" onClick={resetAllData}>
                        <CircleXIcon size={15} />
                    </button>
                </m.div>
            )}

            <div className="flex items-center gap-2 p-2">
                <Textarea
                    rows={2}
                    className="h-auto resize-none border-none text-sm shadow-none focus-visible:ring-0 focus-visible:ring-inset"
                    placeholder="Комментарий"
                    {...register('content')}
                />
                <Button
                    className="mb-auto size-10 rounded"
                    size="icon"
                    type="submit"
                    disabled={!isValid || isPending}
                    // isLoading={isPending}
                >
                    <SendHorizonalIcon />
                </Button>
            </div>
        </form>
    );
}
