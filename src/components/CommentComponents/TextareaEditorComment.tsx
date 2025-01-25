import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SendHorizonalIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { queryClient } from '../Provider/getQueryClient';

import { CommentPayloadSchema, type TCommentPayloadSchema } from '@/lib/types/comment.type';
import type { Post } from '@/lib/types/post';
import { CommentService } from '@/services/comment.service';

export function TextareaEditorComment({
    postId,
    updatePost,
}: {
    postId: number;
    updatePost: Dispatch<SetStateAction<Post>>;
}) {
    const {
        handleSubmit,
        resetField,
        register,
        formState: { isValid },
    } = useForm<TCommentPayloadSchema>({
        mode: 'onChange',
        resolver: zodResolver(CommentPayloadSchema),
        defaultValues: {
            parentId: null,
            postId,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['send-comment'],
        mutationFn: async (payload: TCommentPayloadSchema) => await CommentService.sendPost(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-post-comments'],
            });
            updatePost((prevState) => ({
                ...prevState,
                commentCount: prevState.commentCount + 1,
            }));
            resetField('content');
        },
        onError: async (error) => {
            if (axios.isAxiosError(error)) {
                const { toast } = await import('react-hot-toast');
                toast.error(error.response?.data.detail);
            }
        },
    });

    const sendCommentHandler: SubmitHandler<TCommentPayloadSchema> = (data) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(sendCommentHandler)}
            className="fixed left-0 right-0 bottom-0 flex gap-1 bg-bg items-center px-2 shadow-2xl shadow-black"
        >
            <Textarea
                rows={2}
                className="resize-none focus-visible:ring-inset focus-visible:ring-0 text-sm h-auto border-none shadow-none"
                placeholder="Комментарий"
                {...register('content')}
            />
            <Button className="h-[40px] w-[40px] rounded-full " type="submit" disabled={!isValid} isLoading={isPending}>
                <SendHorizonalIcon />
            </Button>
        </form>
    );
}
