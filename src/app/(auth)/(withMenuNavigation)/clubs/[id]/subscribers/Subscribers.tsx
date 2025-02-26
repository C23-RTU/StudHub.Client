'use client'

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { BackButton } from '@/components/ui/BackButton/BackButton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';

import { HeaderTitle } from '@/hoc/Header/Header';
import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { SkeletonList } from '@/components/CommentComponents/SkeletonList';

export function Subscribers({ id }: { id: string }) {
    const { data: subscribers, isLoading } = useQuery({
        queryKey: ['fetch-subscribers', id],
        queryFn: async () => (await clubsApi.clubsGetAllByClubId(Number(id))).data,
    });

    return (
        <div className="page">
            <div className="sticky top-1 left-0 flex items-center mb-4 gap-5">
                <Link href={`${AUTH_PAGE.CLUBS}/${id}`}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </div>
            <div className="space-y-4">
                {isLoading && <SkeletonList />}
                {subscribers?.map((subscriber, index) => (
                    <SubscriberCard
                        key={index}
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
