import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { CornerRightDown } from 'lucide-react';

import type { CommentDetailDTO } from '@/api/axios-client/models';

import { CommentItem } from './CommentItem';
import { SkeletonList } from '../Skeletons/SkeletonList';

export function CommentReplies({
    replies,
    isLoading,
    hasNextPage,
    fetchNextPage,
}: {
    replies: CommentDetailDTO[][];
    isLoading: boolean;
    hasNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions,
    ) => Promise<InfiniteQueryObserverResult<InfiniteData<CommentDetailDTO[], unknown>, Error>>;
}) {
    if (isLoading) return <SkeletonList />;

    return (
        <>
            {replies.length > 0 &&
                replies.map((page) =>
                    page.map((reply) => <CommentItem className="ml-[40px]" key={reply.id} comment={reply} />),
                )}

            {replies && replies.length > 0 && hasNextPage && (
                <button
                    type="button"
                    className="text-xs text-primary text-center flex justify-center gap-1 items-center"
                    onClick={() => fetchNextPage()}
                >
                    Показать еще
                    <CornerRightDown size={14} />
                </button>
            )}
        </>
    );
}
