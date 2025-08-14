'use client';

import { useMemo, useState } from 'react';

import type { PostDetailDTO } from '@/api/axios-client';

import { ActionButton } from '../ui/PostActionButton/PostActionButton';

import { PostHeader } from './PostHeader/PostHeader';
import { PostImageWrapper } from './PostImageSwiper/PostImageWrapper';
import { truncateText } from '@/lib/utils/text.util';
import { cn } from '@/lib/utils/utils';

type PostCardProps = {
    className?: string;
    post: PostDetailDTO;
};

export function PostCard({ className, post }: PostCardProps) {
    const [showFull, setShowFull] = useState(false);

    const isLong = useMemo(() => post.content.length > 356, [post]);
    const displayText = useMemo(
        () => (!showFull && isLong ? truncateText(post.content, 200) : post.content),
        [post, isLong, showFull]
    );

    return (
        <article className={cn('border-border flex flex-col gap-3 border-b p-[20px]', className)}>
            <PostHeader post={post} />
            <div>
                <p className="text-text my-1 text-xl font-bold">{post.title}</p>
                <p className="text-sm whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                    {displayText}
                    {!showFull && isLong && '...'}
                </p>
                {((!showFull && isLong) || (showFull && isLong)) && (
                    <button
                        onClick={() => setShowFull(!showFull && isLong ? true : false)}
                        className="text-primary mt-1 text-sm font-medium focus:outline-none"
                    >
                        {(!showFull && isLong) || (showFull && isLong)
                            ? showFull && isLong
                                ? 'Скрыть все'
                                : 'Показать все'
                            : ''}
                    </button>
                )}
            </div>
            {post.postImages.length !== 0 && <PostImageWrapper images={post.postImages} />}
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <ActionButton post={post} type={'like'} />
                    <ActionButton post={post} type={'comment'} />
                </div>

                {/* <p className="text-xs opacity-50 font-inter">
                    {new Date().toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </p> */}
            </div>
        </article>
    );
}
