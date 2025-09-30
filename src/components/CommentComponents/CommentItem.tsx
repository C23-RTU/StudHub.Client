'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { type MouseEvent, useMemo } from 'react';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import type { CommentDetailDTO } from '@/api/axios-client';

import { Avatar } from '../ui/Avatar';

import { CommentReplies } from './CommentReplies';
import { useCommentReplies } from './hooks/useCommentReplies';
import { useCommentStore } from './store/useComment.store';
import { parseLocalDate } from '@/lib/utils/time.util';
import { cn } from '@/lib/utils/utils';

export function CommentItem({
    comment,
    className,
    showMinimumComponent = false,
}: {
    comment: CommentDetailDTO;
    className?: string;
    showMinimumComponent?: boolean;
}) {
    const { data: user } = useProfile();

    const setCommentForReply = useCommentStore((store) => store.setCommentForReply);
    const commentForReply = useCommentStore((store) => store.commentForReply);

    const setHighlightComment = useCommentStore((store) => store.setHighlightComment);
    const highlightComment = useCommentStore((store) => store.highlightComment);

    const openCommentMoreSheet = useCommentStore((store) => store.openCommentMoreSheet);

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

    const isMyComment = useMemo(() => {
        return comment.personSummary.id === user?.id;
    }, [comment, user]);

    const setDefaultEvent = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const setHighlightCommentHandler = (event: MouseEvent) => {
        setDefaultEvent(event);
        setHighlightComment(comment);
    };

    const setCommentForReplyHandler = (event: MouseEvent) => {
        setDefaultEvent(event);
        setCommentForReply(comment);
    };

    const openMoreRepliesHandler = (event: MouseEvent) => {
        setDefaultEvent(event);
        openMoreReplies();
    };

    const openCommentMoreSheetHandler = (event: MouseEvent) => {
        setDefaultEvent(event);
        openCommentMoreSheet(comment);
    };

    const createdCommentDate = useMemo(() => {
        return parseLocalDate(comment.createdAt);
    }, [comment.createdAt]);

    const displayContent = useMemo(() => {
        return comment.deletedAt
            ? comment.content + ` ${parseLocalDate(comment.deletedAt, { dateStyle: 'short' })}`
            : comment.content;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment.deletedAt]);

    return (
        <div className="flex flex-col p-3">
            <div
                id={`comment-${comment.id}`}
                onClick={setHighlightCommentHandler}
                className={cn('flex gap-3 rounded-md transition-colors', className, {
                    'bg-secondary': commentForReply?.id === comment.id || highlightComment?.inReplyTo == comment.id,
                })}
            >
                <Link href={AUTH_PAGE.USER_PROFILE(comment.personSummary.id)}>
                    <div className="shrink-0">
                        <Avatar src={comment.personSummary?.imagePath} size={40} alt={comment.personSummary.lastName} />
                    </div>
                </Link>

                <div className="flex w-full flex-col gap-2 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <Link href={AUTH_PAGE.USER_PROFILE(comment.personSummary.id)}>
                            <p className="font-geologica text-sm font-medium">
                                {comment.personSummary?.firstName} {comment.personSummary?.lastName}
                            </p>
                        </Link>
                        <small className="text-xs text-neutral-500">{createdCommentDate}</small>
                    </div>

                    <p
                        className={cn(
                            'font-inter text-xs leading-snug font-normal break-words whitespace-pre-line text-neutral-700 dark:text-neutral-300',
                            {
                                'text-neutral-400 dark:text-neutral-600': comment.deletedAt,
                            }
                        )}
                    >
                        {displayContent}
                    </p>

                    {!showMinimumComponent && (
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex cursor-pointer items-center text-xs text-neutral-500"
                                onClick={setCommentForReplyHandler}
                            >
                                Ответить
                            </button>

                            {isMyComment && (
                                <button
                                    type="button"
                                    className="flex items-center text-xs text-neutral-500"
                                    onClick={openCommentMoreSheetHandler}
                                >
                                    Еще
                                    <ChevronRight size={14} />
                                </button>
                            )}

                            {showRepliesBtn && (
                                <button
                                    type="button"
                                    className="text-primary cursor-pointer text-xs"
                                    onClick={openMoreRepliesHandler}
                                >
                                    Показать ответы
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!showMinimumComponent && (
                <CommentReplies
                    replies={replies?.pages || []}
                    isLoading={isLoading}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                />
            )}
        </div>
    );
}
