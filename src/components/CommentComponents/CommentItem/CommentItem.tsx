'use client';

import Image from 'next/image';

// import { ActionButton } from '../ui/ActionButton/ActionButton';

import type { IComment } from '@/lib/types/comment.type';

export function CommentItem({ comment }: { comment: IComment }) {
    return (
        <div className="flex gap-2">
            <div className="shrink-0">
                <Image src={'/img/avatar.png'} width={40} height={40} alt="avatar" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                    <p className="font-geologica font-medium text-sm">Николай Гусев</p>
                    <small className="text-xss opacity-50 font-inter font-normal">12 минут назад</small>
                </div>
                <p className="text-xs font-inter font-normal text-[#B8B8B8] leading-snug">{comment.content}</p>

                <div className="flex gap-2">
                    {/* <ActionButton type={'like'} initialValue={11} /> */}
                    {/* <ActionButton type={'comment'} initialValue={10} /> */}
                </div>
            </div>
        </div>
    );
}
