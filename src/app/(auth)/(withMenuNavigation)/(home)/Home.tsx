'use client';

import { LoaderCircle } from 'lucide-react';

import { NotificationBadge } from '@/components/Badge/NotificationBadge/NotificationBadge';
import { Page } from '@/components/Page';
import { PostCard } from '@/components/PostCard/PostCard';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { feedApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const getTimeBasedGreeting = (): string => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Доброе утро';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Добрый день';
    } else if (currentHour >= 18 && currentHour < 23) {
        return 'Добрый вечер';
    } else {
        return 'Доброй ночи';
    }
};

export default function Home() {
    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage, error },
    } = useInfinityScroll({
        queryKey: ['fetch-feed-posts'],
        queryFn: async ({ pageParam = 0 }) => (await feedApi.feedGetFeedPosts(pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <Page className="px-0 py-0">
            <Header className="flex flex-row items-center px-[20px] py-[12px]">
                <HeaderTitle>{getTimeBasedGreeting()}</HeaderTitle>
                <NotificationBadge count={0} />
            </Header>

            <MainContent>
                <div className="flex flex-col">
                    {isLoading && <LoaderCircle size={32} className="mx-auto my-5 animate-spin" />}
                    {data && data.pages.flatMap((page) => page).map((post) => <PostCard key={post.id} post={post} />)}
                    {isFetchingNextPage && <LoaderCircle size={32} className="mx-auto my-5 animate-spin" />}
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
