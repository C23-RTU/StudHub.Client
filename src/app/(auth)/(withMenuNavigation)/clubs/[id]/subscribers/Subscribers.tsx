'use client';

import Link from 'next/link';

import Loader from '@/components/Loader';
import { Page } from '@/components/Page';
import { SubscriberCard } from '@/components/SubscriberCard';
import { BackButton } from '@/components/ui/BackButton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header';

export function Subscribers({ id }: { id: string }) {
    const {
        ref,
        infiniteQuery: { data: subscribers, isLoading },
    } = useInfinityScroll({
        queryKey: ['fetch-subscribers', id],
        queryFn: async ({ pageParam = 0 }) => (await clubsApi.clubsGetByClubId(Number(id), pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <Page>
            <Header className="justify-start gap-3 px-[20px] py-[16px]">
                <Link href={AUTH_PAGE.CLUB_SUBSCRIBERS(id)}>
                    <BackButton variant={'ghost'} />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </Header>
            <div className="space-y-4 p-[20px]">
                {isLoading && <Loader className="mx-auto" />}
                {subscribers?.pages.flatMap((page) =>
                    page.map((subscriber) => (
                        <SubscriberCard
                            key={subscriber.id}
                            userId={subscriber.id}
                            firstName={subscriber.firstName}
                            lastName={subscriber.lastName}
                            avatar={subscriber.imagePath || ''}
                        />
                    ))
                )}
                <div ref={ref}></div>
            </div>
        </Page>
    );
}
