'use client';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import Loader from '@/components/Loader';
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
        <Page>
            <Header className="justify-between">
                <HeaderTitle>{getTimeBasedGreeting()}</HeaderTitle>
                <p className="font-medium text-neutral-500">{format(Date(), 'd MMMM', { locale: ru })}</p>
            </Header>

            <MainContent>
                <div className="flex flex-col">
                    {isLoading && <Loader className="mx-auto mt-10" />}
                    {data && data.pages.flatMap((page) => page).map((post) => <PostCard key={post.id} post={post} />)}
                    {isFetchingNextPage && <Loader className="mx-auto mt-10" />}
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
