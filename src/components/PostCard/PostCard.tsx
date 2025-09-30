'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

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

const PostReportDialog = dynamic(() => import('./PostHeader/PostReportDialog').then((mod) => mod.default), {
    ssr: false,
});

export function PostCard({ className, post }: PostCardProps) {
    const [showFull, setShowFull] = useState(false);
    const [showReport, setShowReport] = useState(false);

    const isLong = post.content.length > 356;
    const displayText = !showFull && isLong ? truncateText(post.content, 200) : post.content;

    return (
        <>
            <article className={cn('border-border flex flex-col gap-3 border-b p-[20px]', className)}>
                <PostHeader post={post} onOpenChange={setShowReport} />
                <div>
                    <p className="text-text my-1 text-xl font-semibold">{post.title}</p>
                    <p className="text-sm whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                        {displayText}
                        {!showFull && isLong && '...'}
                    </p>
                    {((!showFull && isLong) || (showFull && isLong)) && (
                        <button
                            onClick={() => setShowFull(!showFull && isLong)}
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
            {/* FIXME Мне кажется что это сильно будет бить по загрузке страницы */}
            <PostReportDialog open={showReport} onOpenChange={setShowReport} />
        </>
    );
}
