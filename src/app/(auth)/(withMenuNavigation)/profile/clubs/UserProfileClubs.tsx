'use client';

import { useMemo } from 'react';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { userApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';

export default function UserProfileClubs() {
    const {
        ref,
        infiniteQuery: { data: clubs, isLoading, isFetchingNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-user-clubs'],
        queryFn: async (page) => (await userApi.userGetSubscribedClubs(page.pageParam, 12)).data,
        pageSize: 12,
    });

    const userClubs = useMemo(() => (clubs ? clubs.pages.flatMap((page) => page) : []), [clubs]);

    return (
        <div className="page">
            <Header className="justify-start gap-4">
                <BackButton />
                <HeaderTitle>Подписки</HeaderTitle>
            </Header>
            <div className="space-y-4">
                {(isFetchingNextPage || isLoading) && <SkeletonList />}
                {!isLoading && userClubs.length === 0 ? (
                    <p className="text-center text-neutral-400">Вы пока не подписаны ни на один клуб</p>
                ) : (
                    userClubs.map((club) => <ClubCard key={club.id} club={club} />)
                )}
                <div ref={ref}></div>
            </div>
        </div>
    );
}
