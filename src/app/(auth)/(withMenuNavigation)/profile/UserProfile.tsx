'use client';

import { useQuery } from '@tanstack/react-query';
import { IdCard, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { SettingBadge } from '@/components/Badge/SettingBadge/SettingBadge';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { Avatar } from '@/components/ui/Avatar/Avatar';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { userApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client/models';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

type Props = {
    user: PersonDetailDTO;
};

export default function Profile({ user }: Props) {
    const {
        data: userClubs,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['fetch-profile-user-clubs'],
        queryFn: async () => (await userApi.userGetSubscribedClubs(0, 3)).data,
    });

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Профиль</HeaderTitle>
                <Link href={AUTH_PAGE.PROFILE_SETTINGS}>
                    <SettingBadge />
                </Link>
            </Header>

            <MainContent>
                <div className="flex flex-row gap-4">
                    <Avatar src={user?.imagePath} size={80} alt={'Изображение профиля'} />
                    <div className="my-auto flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-xl font-bold text-ellipsis whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-400">был недавно</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <MessageSquare size={20} />
                        <p className="max-w-full overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                            {user?.about || '...'}
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <IdCard size={20} />
                        <p className="max-w-full overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                            {user?.institute?.name || 'Нет института'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica text-lg font-bold">Подписки</p>
                        <Link href={AUTH_PAGE.PROFILE_CLUBS} className="font-inter text-primary font-light">
                            Показать все
                        </Link>
                    </div>
                    {isLoading && <SkeletonList amount={3} />}
                    {!isLoading &&
                        userClubs &&
                        userClubs.length > 0 &&
                        userClubs.map((club) => <ClubCard key={club.id} club={club} />)}
                    {error && <p className="text-center text-neutral-500">Не удалось загрузить ваши подписки</p>}
                </div>
            </MainContent>
        </div>
    );
}
