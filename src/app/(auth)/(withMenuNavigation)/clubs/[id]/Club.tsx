'use client';

import { useQuery } from '@tanstack/react-query';

import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import { ClubInfo } from '@/components/ClubComponents/ClubInfo/ClubInfo';
import { SubscribeButton } from '@/components/ClubComponents/SubscribeButtons/SubscribeButton';
import { Skeleton } from '@/components/ui/skeleton';

import { clubsApi } from '@/api/api';

export function Club({ id = '1' }: { id: string }) {
    const { data: club, isLoading } = useQuery({
        queryKey: ['fetch-club', id],
        queryFn: async () => (await clubsApi.clubsGetById(Number(id))).data,
    });

    return (
        <div className="relative p-0">
            <ClubHeader club={club} isLoading={isLoading} />
            <div className="page pt-0">
                {!isLoading ? (
                    <>
                        <ClubInfo club={club} />
                        <SubscribeButton clubId={id} isBig={true} subscribed={club?.isUserSubscribed} />
                        <ClubFeed />
                    </>
                ) : (
                    <>
                        <Skeleton className="my-3 w-[250px] h-[32px] mx-auto" />
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton key={index} className="w-full mt-2 h-[28px]" />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
