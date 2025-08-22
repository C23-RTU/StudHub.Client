'use client';

import dynamic from 'next/dynamic';

import Loader from '@/components/Loader';
import { Page } from '@/components/Page';
import { Skeleton } from '@/components/ui/skeleton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { feedApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { parseLocalTime } from '@/lib/utils/time.util';

const PostCardDynamic = dynamic(() => import('@/components/PostCard/PostCard').then((mod) => mod.PostCard), {
    loading: () => <Skeleton className="my-2 h-[400px]" />,
});

export default function Home({ timeBasedGreeting }: { timeBasedGreeting: string }) {
    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage, error },
    } = useInfinityScroll({
        queryKey: ['fetch-feed-posts'],
        queryFn: async ({ pageParam = 0 }) => (await feedApi.feedGetFeedPosts(pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <Page>
            <Header className="justify-between">
                <HeaderTitle>{timeBasedGreeting}</HeaderTitle>
                <p className="font-medium text-neutral-500">
                    {parseLocalTime(Date(), { day: 'numeric', month: 'short' })}
                </p>
            </Header>

            <MainContent>
                <div className="flex flex-col">
                    {data &&
                        data.pages.flatMap((page) => page).map((post) => <PostCardDynamic key={post.id} post={post} />)}
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
            </MainContent>
        </Page>
    );
}
