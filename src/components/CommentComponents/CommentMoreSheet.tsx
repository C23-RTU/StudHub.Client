import { useMemo } from 'react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

import { CommentItem } from './CommentItem';
import { useRemoveComment } from './hooks/useRemoveComment';
import { useCommentStore } from './store/useComment.store';

export function CommentMoreSheet() {
    const commentMoreSheet = useCommentStore((store) => store.commentMoreSheet);
    const closeCommentMoreSheet = useCommentStore((store) => store.closeCommentMoreSheet);

    const { isPending, mutate } = useRemoveComment();

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
