'use client';

import Link from 'next/link';

import { Avatar } from '@/components/ui/Avatar/Avatar';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PostDetailDTO } from '@/api/axios-client';

import { MoreDropList } from './MoreDropList';
import { parseLocalDate } from '@/lib/utils/time.util';

type Props = {
    post: PostDetailDTO;
};

export function PostHeader({ post }: Props) {
    return (
        <div className="flex items-center justify-between">
            <Link className="flex items-center" href={AUTH_PAGE.CLUB(post.club.id)}>
                <div className="relative flex">
                    <Avatar src={post.club.imageUrl} size={45} />
                </div>
                <div className="ml-3 flex max-w-[250px] flex-col overflow-hidden md:max-w-[400px]">
                    <p className="font-geologica truncate font-semibold" title={post.club?.name}>
                        {post.club?.name}
                    </p>
                    <p className="text-sm text-neutral-500">{parseLocalDate(post.createdAt)}</p>
                </div>
            </Link>

            <MoreDropList post={post} />
        </div>
    );
}
