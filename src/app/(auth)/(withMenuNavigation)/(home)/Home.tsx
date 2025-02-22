'use client';

import { useQuery } from '@tanstack/react-query';

import { NotificationBadge } from '@/components/Badge/NotificationBadge/NotificationBadge';
import { PostLoader } from '@/components/ui/PostLoader/PostLoader';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { postApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Home({ username }: { username: string }) {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['fetch-posts-list'],
        queryFn: async () => (await postApi.postsGetAll()).data,
        staleTime: 30000, // кешируем  на 30 секунд
    });

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Доброе утро, {username} 👋</HeaderTitle>
                <NotificationBadge />
            </Header>

            <MainContent>
                {/* <div className="flex justify-center">
                    <EventCard />
                </div> */}
                <p className="text-xl font-semibold">Лента</p>
                <div>
                    <SearchInput placeholder="Поиск по ленте..." />
                </div>
                <div>
                    <PostLoader isLoading={isLoading} posts={posts} />
                </div>
            </MainContent>
        </div>
    );
}
