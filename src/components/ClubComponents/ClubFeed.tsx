'use client';

import { useParams } from 'next/navigation';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { postApi } from '@/api/api';

import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';
import { Skeleton } from '../ui/skeleton';

import { MainContent } from '@/hoc/MainContent/MainContent';

export function ClubFeed() {
    const { id } = useParams();
    const clubId = Number(id);

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage, error },
    } = useInfinityScroll({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: async ({ pageParam = 0 }) => (await postApi.postsGetByClubId(clubId, pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <MainContent>
            <p className="text-xl font-semibold font-geologica">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {isLoading &&
                    Array(3)
                        .fill(0)
                        .map((_, index) => <Skeleton key={index} className="h-[320px] w-full" />)}
                {data && data.pages.flatMap((page) => page).map((post) => <PostCard key={post.id} post={post} />)}
                {isFetchingNextPage && <Skeleton className="h-[320px] w-full" />}
                {!hasNextPage && <p className="text-center text-neutral-400">На этом лента кончается!</p>}
                {error && <p className="text-center text-neutral-400">Ошибка загрузки постов</p>}
                <div ref={ref}></div>
            </div>
        </MainContent>
    );
}
