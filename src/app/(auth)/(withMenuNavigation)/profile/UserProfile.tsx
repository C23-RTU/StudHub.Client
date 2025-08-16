'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BiMessageSquare, BiSolidIdCard } from 'react-icons/bi';

import { SettingBadge } from '@/components/Badge/SettingBadge/SettingBadge';
import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { Page } from '@/components/Page';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { Avatar } from '@/components/ui/Avatar/Avatar';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import { userApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function UserProfile() {
    const {
        data: userClubs,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['fetch-profile-user-clubs'],
        queryFn: async () => (await userApi.userGetSubscribedClubs(0, 3)).data,
    });
    const { data: user } = useProfile();

    return (
        <Page>
            <Header className="justify-between border-0 py-[12px] pr-[8px]">
                <HeaderTitle>Профиль</HeaderTitle>
                <Link href={AUTH_PAGE.PROFILE_SETTINGS}>
                    <SettingBadge />
                </Link>
            </Header>

            <MainContent className="flex flex-col gap-0">
                <div className="border-border mb-0 flex flex-col gap-0 border-b">
                    <div className="px-pageX flex flex-row gap-4">
                        <Avatar src={user?.imagePath} size={90} alt={'Изображение профиля'} />
                        <div className="my-auto flex flex-col gap-0">
                            <p className="font-geologica max-w-[250px] overflow-hidden text-xl font-bold text-ellipsis whitespace-nowrap">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-neutral-400">был недавно</p>
                        </div>
                    </div>
                    <div className="px-pageX py-pageY flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2 antialiased">
                            <BiMessageSquare className="text-neutral-600" size={24} />
                            <p className="max-w-full overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
                                {user?.about || '...'}
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <BiSolidIdCard size={24} className="text-neutral-600" />
                            <p className="max-w-full overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
                                {user?.institute?.name || 'Нет института'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-pageX py-pageY flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica text-xl font-medium">Подписки</p>
                        <Link href={AUTH_PAGE.PROFILE_CLUBS} className="text-primary">
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
        </Page>
    );
}
