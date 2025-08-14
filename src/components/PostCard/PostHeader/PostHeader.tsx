'use client';

import Link from 'next/link';

import { Avatar } from '@/components/ui/Avatar/Avatar';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PostDetailDTO } from '@/api/axios-client';

import { MoreDropList } from './MoreDropList';

type Props = {
    post: PostDetailDTO;
};

export function PostHeader({ post }: Props) {
    return (
        <div className="flex items-center justify-between">
            <Link className="flex items-center" href={AUTH_PAGE.CLUB(post.club.id)}>
                <div className="relative flex">
                    <Avatar src={post.club.imageUrl} />
                </div>
                <div className="ml-3 flex max-w-[250px] flex-col overflow-hidden">
                    <p
                        className="font-geologica truncate font-semibold text-neutral-950 dark:text-neutral-50"
                        title={post.club?.name}
                    >
                        {post.club?.name}
                    </p>
                </div>
            </Link>

            <MoreDropList post={post} />
        </div>
    );
}
