'use client';

import { ChevronRight } from 'lucide-react';

import type { CommentDetailDTO } from '@/api/axios-client';

import { Avatar } from '../ui/Avatar/Avatar';

import { useCommentStore } from './useComment.store';
import { parseLocalDate } from '@/lib/utils/time.util';
import { cn } from '@/lib/utils/utils';

export function CommentItem({
    comment,
    className,
    replies,
}: {
    comment: CommentDetailDTO;
    className?: string;
    replies: CommentDetailDTO[];
}) {
    const setCommentPayload = useCommentStore((store) => store.setCommentPayload);

    return (
        <div className="flex flex-col gap-3">
            <div className={cn('flex gap-2', className)}>
                <div className="shrink-0">
                    <Avatar
                        src={comment.personDetailDTO?.imagePath}
                        loaderSize={15}
                        size={40}
                        alt={comment.personDetailDTO.lastName}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full overflow-hidden ">
                    <div className="flex justify-between items-center">
                        <p className="font-geologica font-medium text-sm">
                            {comment.personDetailDTO?.firstName} {comment.personDetailDTO?.lastName}
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
                                setCommentPayload({
                                    postId: comment.postId,
                                    content: `${comment.personDetailDTO.firstName}, `,
                                    parentId: comment.parentId !== null ? (comment.parentId as number) : comment.id,
                                });

                                console.log(comment.parentId !== null ? (comment.parentId as number) : comment.id);
                            }}
                        >
                            Ответить
                            <ChevronRight size={14} />
                        </button>
                        {/* <ActionButton type={'like'} initialValue={11} /> */}
                        {/* <ActionButton type={'comment'} initialValue={10} /> */}
                    </div>
                </div>
            </div>
            {replies.length > 0 &&
                replies.map((reply) => (
                    <CommentItem className="ml-[40px]" key={reply.id} comment={reply} replies={[]} />
                ))}
        </div>
    );
}
