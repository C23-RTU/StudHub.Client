'use client';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { userApi } from '@/api/api';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

export default function ProfileClubs() {
    const { ref, infiniteQuery: { data: clubs, isLoading, isFetchingNextPage, hasNextPage } } = useInfinityScroll({
        queryKey: ['fetch-user-clubs'],
        queryFn: async (page) => (await userApi.userGetSubscribedClubs(page.pageParam, 12)).data,
        pageSize: 12,
    });

    const userClubs = clubs ? clubs.pages.flatMap((page) => page) : [];

    return (
        <div className="page">
            <Header className='justify-start gap-4'>
                <BackButton />
                <HeaderTitle>Подписки</HeaderTitle>
            </Header>
            <div className="space-y-4">
                { isLoading && <SkeletonList /> }
                {userClubs?.length === 0 ? (
                    <p className="text-center text-neutral-400">Вы пока не подписаны ни на один клуб</p>
                ) : (
                    userClubs?.map((club) => <ClubCard key={club.id} club={club} showSubscribe />)
                )}
                {isFetchingNextPage && <SkeletonList />}
                {!hasNextPage && <p className="text-center text-neutral-400">На этом все!</p>}
                <div ref={ref}></div>
            </div>
        </div>
    );
}
