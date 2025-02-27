'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { BackButton } from '@/components/ui/BackButton/BackButton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';

export function Subscribers({ id }: { id: string }) {
    const { data: subscribers, isLoading } = useQuery({
        queryKey: ['fetch-subscribers', id],
        queryFn: async () => (await clubsApi.clubsGetAllByClubId(Number(id))).data,
    });

    return (
        <div className="page">
            <Header className='justify-start gap-4'>
                <Link href={`${AUTH_PAGE.CLUBS}/${id}`}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </Header>
            <div className="space-y-4">
                {isLoading && <SkeletonList />}
                {subscribers?.map((subscriber) => (
                    <SubscriberCard
                        key={subscriber.id}
                        firstName={subscriber.firstName}
                        lastName={subscriber.lastName}
                        avatar={getStaticImg(subscriber.imagePath || '')}
                        role={'Не указано'}
                    />
                ))}
            </div>
        </div>
    );
}
