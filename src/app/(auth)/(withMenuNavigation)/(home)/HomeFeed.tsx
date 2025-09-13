'use client';

import dynamic from 'next/dynamic';

import Loader from '@/components/Loader';
import { Skeleton } from '@/components/ui/skeleton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { feedApi } from '@/api/api';

const PostCardDynamic = dynamic(() => import('@/components/PostCard/PostCard').then((mod) => mod.PostCard), {
    loading: () => <Skeleton className="my-2 h-[400px]" />,
    ssr: false,
});

export default function HomeFeed() {
    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage, error },
    } = useInfinityScroll({
        queryKey: ['fetch-feed-posts'],
        queryFn: async ({ pageParam = 0 }) => (await feedApi.feedGetFeedPosts(pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <div className="flex flex-col">
            {data && data.pages.flatMap((page) => page).map((post) => <PostCardDynamic key={post.id} post={post} />)}
            {(isFetchingNextPage || isLoading) && <Loader className="mx-auto mt-10" />}
            {!hasNextPage && !isLoading && (
                <p className="p-4 pb-5 text-center text-neutral-500">Ваша лента закончилась</p>
            )}
            {error && (
                <p className="text-center text-neutral-500">
                    Не удалось выполнить загрузку постов. Пожалуйста, повторите позже.
                </p>
            )}
            <div ref={ref}></div>
        </div>
    );
}
