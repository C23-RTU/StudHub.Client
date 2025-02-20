import { PostCard } from '@/components/PostCard/PostCard';

import type { PostDetailDTO } from '@/api/axios-client';

import { Skeleton } from '../skeleton';

type Props = {
    isLoading: boolean;
    posts: PostDetailDTO[] | undefined;
    amount?: number;
};

export function PostLoader({ isLoading, posts, amount = 2 }: Props) {
    return (
        <div className="flex flex-col gap-10">
            {isLoading &&
                Array(amount)
                    .fill(0)
                    .map((_, index) => <Skeleton key={index} className="h-[320px] w-full" />)}
            {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
    );
}
