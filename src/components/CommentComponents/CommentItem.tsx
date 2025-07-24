'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { type MouseEvent, useMemo } from 'react';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import type { CommentDetailDTO } from '@/api/axios-client';

import { Avatar } from '../ui/Avatar/Avatar';

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
        return comment.personSummaryDTO.id === user?.id;
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
        <div className="flex flex-col gap-3">
            <div
                id={`comment-${comment.id}`}
                onClick={setHighlightCommentHandler}
                className={cn('flex gap-2 rounded-md p-1 transition-colors', className, {
                    'bg-secondary': commentForReply?.id === comment.id || highlightComment?.inReplyTo == comment.id,
                })}
            >
                <Link href={`${AUTH_PAGE.PROFILE}/${comment.personSummaryDTO.id}`}>
                    <div className="shrink-0">
                        <Avatar
                            src={comment.personSummaryDTO?.imagePath}
                            loaderSize={15}
                            size={40}
                            alt={comment.personSummaryDTO.lastName}
                        />
                    </div>
                </Link>

                <div className="flex w-full flex-col gap-2 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <Link href={`${AUTH_PAGE.PROFILE}/${comment.personSummaryDTO.id}`}>
                            <p className="font-geologica text-sm font-medium">
                                {comment.personSummaryDTO?.firstName} {comment.personSummaryDTO?.lastName}
                            </p>
                        </Link>
                        <small className="text-xss font-inter font-normal opacity-50">{createdCommentDate}</small>
                    </div>

                    <p
                        className={cn(
                            'font-inter text-xs leading-snug font-normal break-words whitespace-pre-line text-[#B8B8B8]',
                            {
                                'text-[#696868]': comment.deletedAt,
                            }
                        )}
                    >
                        {displayContent}
                    </p>

                    {!showMinimumComponent && (
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex cursor-pointer items-center text-xs text-gray-500"
                                onClick={setCommentForReplyHandler}
                            >
                                Ответить
                            </button>

                            {isMyComment && (
                                <button
                                    type="button"
                                    className="flex items-center text-xs text-gray-500"
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
