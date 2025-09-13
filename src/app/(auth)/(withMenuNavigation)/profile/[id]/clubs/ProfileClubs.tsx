'use client';

import { useMemo } from 'react';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SkeletonList } from '@/components/ui/skeleton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { clubsApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

export default function ProfileClubs({ user }: { user: PersonDetailDTO }) {
    const {
        ref,
        infiniteQuery: { data: clubs, isLoading, isFetchingNextPage },
    } = useInfinityScroll({
        queryKey: [user.id, 'fetch-user-clubs'],
        queryFn: async (page) => (await clubsApi.clubsGetByPersonId(user.id, page.pageParam, 12)).data,
        pageSize: 12,
    });

    const userClubs = useMemo(() => (clubs ? clubs.pages.flatMap((page) => page) : []), [clubs]);

    return (
        <div className="space-y-4 p-4">
            {(isFetchingNextPage || isLoading) && <SkeletonList />}
            {!isLoading && userClubs.length === 0 ? (
                <p className="text-center text-neutral-400">Нет ни одной подписки</p>
            ) : (
                userClubs.map((club) => <ClubCard key={club.id} club={club} />)
            )}
            <div ref={ref}></div>
        </div>
    );
}
