import Image from 'next/image';

import { MoreDropList } from './MoreDropList';
import type { Post } from '@/lib/types/post';

type Props = {
    post: Post;
};

export function PostHeader({ post }: Props) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={post.user.avatarUrl || ''} width={40} height={40} alt="avatar" />
                <div className="flex flex-col ml-3">
                    <p className="text-sm font-geologica font-semibold">{post.user.name}</p>
                    <small className="text-[10px] font-inter font-normal">{post.user.major}</small>
                </div>
            </div>

            <MoreDropList />
        </div>
    );
}
