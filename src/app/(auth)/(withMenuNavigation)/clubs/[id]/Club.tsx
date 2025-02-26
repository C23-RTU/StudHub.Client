'use client';

import { useQuery } from '@tanstack/react-query';

import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import { ClubInfo } from '@/components/ClubComponents/ClubInfo/ClubInfo';
import { SubscribeButton } from '@/components/ClubComponents/SubscribeButtons/SubscribeButton';

import { clubsApi } from '@/api/api';

export function Club({ id = '1' }: { id: string }) {
    const { data: club } = useQuery({
        queryKey: ['fetch-club', id],
        queryFn: async () => (await clubsApi.clubsGetById(Number(id))).data,
    });

    return (
        <div className="relative p-0">
            <ClubHeader club={club} />
            <div className="page pt-0">
                <ClubInfo clubId={id} club={club} />
                <SubscribeButton clubId={id} isBig={true} subscribed={club?.isUserSubscribed} />
                <ClubFeed />
            </div>
        </div>
    );
}
