import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer';

import { CommentItem } from './CommentItem';
import { useRemoveComment } from './hooks/useRemoveComment';
import { useCommentStore } from './store/useComment.store';

export function CommentMoreSheet() {
    const commentMoreSheet = useCommentStore((store) => store.commentMoreSheet);
    const closeCommentMoreSheet = useCommentStore((store) => store.closeCommentMoreSheet);

    const { isPending, mutate } = useRemoveComment();

    return (
        <Drawer open={!!commentMoreSheet} onOpenChange={closeCommentMoreSheet}>
            <DrawerContent>
                <DrawerHeader>
                    {commentMoreSheet && <CommentItem comment={commentMoreSheet} showMinimumComponent={true} />}
                </DrawerHeader>
                <DrawerFooter>
                    {commentMoreSheet && !commentMoreSheet?.deletedAt && (
                        <Button variant={'red'} onClick={() => mutate()} isLoading={isPending}>
                            Удалить комментарий
                        </Button>
                    )}
                    <Button variant={'outline'} onClick={closeCommentMoreSheet}>
                        Отмена
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
