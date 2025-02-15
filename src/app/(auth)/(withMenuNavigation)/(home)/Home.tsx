'use client';

import { useQuery } from '@tanstack/react-query';

import { NotificationBadge } from '@/components/Badge/NotificationBadge/NotificationBadge';
import { PostCard } from '@/components/PostCard/PostCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';
import { Skeleton } from '@/components/ui/skeleton';

import { postApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Home({ username }: { username: string }) {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['fetch-posts'],
        queryFn: async () => (await postApi.postsGetAll()).data,
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
                <div className="flex flex-col gap-10">
                    {isLoading &&
                        Array(2)
                            .fill(0)
                            .map((_, index) => <Skeleton key={index} className="h-[320px] w-full" />)}
                    {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
                </div>
            </MainContent>
        </div>
    );
}
