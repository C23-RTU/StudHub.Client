import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { commentApi } from '@/api/api';
import type { CommentDetailDTO } from '@/api/axios-client/models';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

import { CommentItem } from './CommentItem';
import { useCommentStore } from './store/useComment.store';

export function CommentMoreSheet() {
    const commentMoreSheet = useCommentStore((store) => store.commentMoreSheet);
    const closeCommentMoreSheet = useCommentStore((store) => store.closeCommentMoreSheet);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['delete-comment', commentMoreSheet?.id],
        mutationFn: async () => (await commentApi.commentsDelete(commentMoreSheet?.id as number)).data,
        onSuccess(updateComment: CommentDetailDTO) {
            //FIXME:  тут тоже можно изменить логику на setQueryData
            if (!updateComment.threadId) {
                queryClient.invalidateQueries({ queryKey: ['fetch-post-comments', commentMoreSheet?.postId] });
            }
            if (updateComment.threadId) {
                queryClient.invalidateQueries({
                    queryKey: ['get-comment-replies', commentMoreSheet?.threadId],
                });
            }

            closeCommentMoreSheet();
        },
    });

    const isCommentDelete = useMemo(() => {
        if (!commentMoreSheet) return true;

        return commentMoreSheet?.content === 'Комментарий удалён';
    }, [commentMoreSheet]);

    return (
        <Sheet open={!!commentMoreSheet} onOpenChange={closeCommentMoreSheet}>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-left">
                        {commentMoreSheet && <CommentItem comment={commentMoreSheet} showMinimumComponent={true} />}
                    </SheetTitle>
                    <SheetDescription>
                        {!isCommentDelete && (
                            <Button
                                className="w-full justify-center mx-auto mt-3"
                                variant={'red'}
                                onClick={() => mutate()}
                                isLoading={isPending}
                            >
                                Удалить комментарий
                            </Button>
                        )}
                    </SheetDescription>
                </SheetHeader>
                <Button
                    className="w-full justify-center mx-auto mt-3"
                    variant={'secondary'}
                    onClick={closeCommentMoreSheet}
                >
                    Отмена
                </Button>
            </SheetContent>
        </Sheet>
    );
}
