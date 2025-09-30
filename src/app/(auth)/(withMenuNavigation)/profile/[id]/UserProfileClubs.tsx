'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import { SkeletonList } from '@/components/ui/skeleton';

import { clubsApi } from '@/api/api';

const ClubCardDynamic = dynamic(() => import('@/components/ClubComponents/ClubCard').then((mod) => mod.ClubCard), {
    ssr: false,
});

export default function UserProfileClubs({ id }: { id: number }) {
    const {
        data: userClubs,
        isLoading,
        error,
    } = useQuery({
        queryKey: [id, 'fetch-profile-user-clubs'],
        queryFn: async () => (await clubsApi.clubsGetByPersonId(id, 0, 3)).data,
    });

    return (
        <Fragment>
            {isLoading && <SkeletonList />}
            {!isLoading &&
                userClubs &&
                userClubs.length > 0 &&
                userClubs.map((club) => <ClubCardDynamic key={club.id} club={club} />)}
            {error && <p className="text-center text-neutral-500">Не удалось загрузить подписки пользователя</p>}
        </Fragment>
    );
}
