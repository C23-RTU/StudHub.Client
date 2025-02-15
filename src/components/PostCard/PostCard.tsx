'use client';

import Image from 'next/image';

import type { PostDetailDTO } from '@/api/axios-client';

import { ActionButton } from '../ui/PostActionButton/PostActionButton';

import { PostHeader } from './PostHeader/PostHeader';
import { cn } from '@/lib/utils/utils';

type PostCardProps = {
    className?: string;
    post: PostDetailDTO;
};

export function PostCard({ className, post }: PostCardProps) {
    return (
        <article className={cn('flex flex-col gap-3', className)}>
            <PostHeader post={post} />
            <div>
                <p className="text-lg my-1 text-neutral-50">{post.title}</p>
                <p className="text-sm font-inter text-gray-300">{post.content}</p>
            </div>
            <div className="flex gap-2">
                {/* {post.tags &&
                    post.tags.map((tag, index) => (
                        <p
                            className="text-xs font-inter text-gray-300 bg-neutral-800 py-2 rounded-3xl px-3 cursor-pointer"
                            key={index}
                        >
                            #{tag}
                        </p>
                    ))} */}
            </div>
            <div className="w-full h-full flex items-center justify-center ">
                <Image
                    src={'/img/eventbanner.jpg'}
                    height={200}
                    width={600}
                    alt={'banner'}
                    className="rounded-md w-full"
                />
            </div>
            <div className="flex items-center justify-between font-inter">
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
