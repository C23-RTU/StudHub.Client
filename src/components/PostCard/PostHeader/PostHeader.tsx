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
                <div className="flex relative">
                    <Image src={post.user.avatarUrl || ''} width={40} height={40} alt="avatar" />
                    {post.user.status === 'online' && (
                        <div className="w-3 h-3 bg-emerald-400 rounded-full border border-bg absolute right-0 bottom-0"></div>
                    )}
                </div>
                <div className="flex flex-col ml-3">
                    <p className="text-sm font-geologica font-semibold">{post.user.name}</p>
                    <small className="text-[10px] font-inter font-normal">{post.user.major}</small>
                </div>
            </div>

            <MoreDropList />
        </div>
    );
}
