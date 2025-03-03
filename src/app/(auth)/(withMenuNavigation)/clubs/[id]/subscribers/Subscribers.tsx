'use client';

import Link from 'next/link';

import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

export function Subscribers({ id }: { id: string }) {
    const {
        ref,
        infiniteQuery: { data: subscribers, isLoading },
    } = useInfinityScroll({
        queryKey: ['fetch-subscribers', id],
        queryFn: async ({ pageParam = 0 }) => (await clubsApi.clubsGetAllByClubId(Number(id), pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <div className="page">
            <Header className="justify-start gap-4">
                <Link href={AUTH_PAGE.CLUB_SUBSCRIBERS(id)}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </Header>
            <div className="space-y-4">
                {isLoading && <SkeletonList amount={5} />}
                {subscribers?.pages.flatMap((page) =>
                    page.map((subscriber) => (
                        <SubscriberCard
                            key={subscriber.id}
                            firstName={subscriber.firstName}
                            lastName={subscriber.lastName}
                            avatar={getStaticImg(subscriber.imagePath || '')}
                            role={'Не указано'}
                        />
                    ))
                )}
                <div ref={ref}></div>
            </div>
        </div>
    );
}
