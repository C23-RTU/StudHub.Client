import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SendHorizonalIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { queryClient } from '../Provider/getQueryClient';

import type { ICommentPayload } from '@/lib/types/comment.type';
import type { Post } from '@/lib/types/post';
import { CommentService } from '@/services/comment.service';

export function TextareaEditorComment({
    postId,
    updatePost,
}: {
    postId: number;
    updatePost: Dispatch<SetStateAction<Post>>;
}) {
    const [text, setText] = useState('');

    const { mutate, isPending } = useMutation({
        mutationKey: ['send-comment'],
        mutationFn: async (payload: ICommentPayload) => await CommentService.sendPost(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetch-post-comments'],
            });
            updatePost((prevState) => ({
                ...prevState,
                commentCount: prevState.commentCount + 1,
            }));

            setText('');
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.detail);
            }
        },
    });

    const sendComment = () => {
        mutate({
            parentId: null,
            personId: 29,
            content: text,
            postId,
        });
    };

    return (
        <div className="fixed left-0 right-0 bottom-0 flex gap-1 bg-bg items-center px-2 shadow-2xl shadow-black">
            <Textarea
                rows={2}
                className="resize-none focus-visible:ring-inset focus-visible:ring-0 text-sm h-auto border-none shadow-none"
                placeholder="Комментарий"
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <Button className="h-[40px] w-[40px] rounded-full " onClick={sendComment} isLoading={isPending}>
                <SendHorizonalIcon />
            </Button>
        </div>
    );
}
