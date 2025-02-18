'use client';

import type { CommentDetailDTO } from '@/api/axios-client';

import { Avatar } from '../ui/Avatar/Avatar';

import { parseLocalDate } from '@/lib/utils/time.util';

export function CommentItem({ comment }: { comment: CommentDetailDTO }) {
    return (
        <div className="flex gap-2">
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
                    {/* <ActionButton type={'like'} initialValue={11} /> */}
                    {/* <ActionButton type={'comment'} initialValue={10} /> */}
                </div>
            </div>
        </div>
    );
}
