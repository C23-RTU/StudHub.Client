'use client';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { userApi } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';

export default function ProfileClubs() {
    const { data: clubs, isLoading } = useQuery({
        queryKey: ['fetch-user-clubs'],
        queryFn: async () => (await userApi.userGetSubscribedClubs()).data,
    });

    return (
        <div className="page">
            <Header className='justify-start gap-4'>
                <BackButton />
                <HeaderTitle>Подписки</HeaderTitle>
            </Header>
            <div className="space-y-4">
                { isLoading && <SkeletonList /> }
                {clubs?.length === 0 ? (
                    <p className="text-center text-neutral-400">Вы пока не подписаны ни на один клуб</p>
                ) : (
                    clubs?.map((club) => <ClubCard key={club.id} club={club} showSubscribe />)
                )}
            </div>
        </div>
    );
}
