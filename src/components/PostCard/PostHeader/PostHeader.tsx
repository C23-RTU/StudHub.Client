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
                <div className="flex relative">
                    <Avatar src={post.club.imageUrl} />
                </div>
                <div className="flex flex-col ml-3 max-w-[200px] overflow-hidden">
                    <p className="text-sm font-geologica font-semibold truncate" title={post.club?.name}>
                        {post.club?.name}
                    </p>
                </div>
            </Link>

            <MoreDropList post={post} />
        </div>
    );
}
