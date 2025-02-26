'use client';

import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

import type { CommentDetailDTO } from '@/api/axios-client';

import { Avatar } from '../ui/Avatar/Avatar';

import { CommentReplies } from './CommentReplies';
import { useCommentReplies } from './hooks/useCommentReplies';
import { useCommentStore } from './store/useComment.store';
import { parseLocalDate } from '@/lib/utils/time.util';
import { cn } from '@/lib/utils/utils';

export function CommentItem({ comment, className }: { comment: CommentDetailDTO; className?: string }) {
    const setCommentForReply = useCommentStore((store) => store.setCommentForReply);
    const commentForReply = useCommentStore((store) => store.commentForReply);

    const {
        isOpenMoreReplies,
        openMoreReplies,
        data: replies,
        isLoading,
        hasNextPage,
        fetchNextPage,
    } = useCommentReplies(comment);

    const showRepliesBtn = useMemo(() => {
        return comment.threadId == null && comment.replyCount != null && comment.replyCount > 0 && !isOpenMoreReplies;
    }, [isOpenMoreReplies, comment]);

    return (
        <div className="flex flex-col gap-3">
            <div
                className={cn('flex gap-2 rounded-md p-1 transition-colors', className, {
                    'bg-secondary': commentForReply?.id === comment.id,
                })}
            >
                <div className="shrink-0">
                    <Avatar
                        src={comment.personSummaryDTO?.imagePath}
                        loaderSize={15}
                        size={40}
                        alt={comment.personSummaryDTO.lastName}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full overflow-hidden ">
                    <div className="flex justify-between items-center">
                        <p className="font-geologica font-medium text-sm">
                            {comment.personSummaryDTO?.firstName} {comment.personSummaryDTO?.lastName}
                        </p>
                        <small className="text-xss opacity-50 font-inter font-normal">
                            {parseLocalDate(comment.createdAt)}
                        </small>
                    </div>
                    <p className="text-xs font-inter font-normal text-[#B8B8B8] leading-snug break-words whitespace-pre-line">
                        {comment.content}
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="text-xs text-gray-500 flex items-center"
                            onClick={() => {
                                setCommentForReply(comment);
                            }}
                        >
                            Ответить
                            <ChevronRight size={14} />
                        </button>
                        {showRepliesBtn && (
                            <button type="button" className="text-xs text-primary" onClick={openMoreReplies}>
                                Показать ответы
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <CommentReplies
                replies={replies?.pages || []}
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
            />
        </div>
    );
}
