'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { BiExit } from 'react-icons/bi';
import { LuPlus } from 'react-icons/lu';

import { Page } from '@/components/Page';
import { ProfileAvatarUploader } from '@/components/ProfileComponents/ProfileAvatar/ProfileAvatarUploader';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';
import { BackButton } from '@/components/ui/BackButton';
import { Menu, MenuItem, MenuLink } from '@/components/ui/menu';
import { SkeletonList } from '@/components/ui/skeleton';

import { AUTH_PAGE, PUBLIC_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import { authApi } from '@/api/api';
import { type PersonDetailDTO } from '@/api/axios-client';

import { useOwnedClubs } from './useOwnedClubs';
import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

export default function Settings({ initUser }: { initUser: PersonDetailDTO }) {
    const router = useRouter();
    const { data: user } = useProfile(initUser);
    const { data: ownedClubs, isLoading } = useOwnedClubs();

    const { mutateAsync } = useMutation({
        mutationKey: ['logout-profile'],
        mutationFn: async () => await authApi.authLogout(),
    });

    const logoutHandler = async () => {
        const { toast } = await import('react-hot-toast');
        toast.promise(
            mutateAsync(),
            {
                loading: 'Выход из системы',
                success: () => {
                    startTransition(() => {
                        router.push(PUBLIC_PAGE.AUTH('login'));
                    });

                    return 'Успешно!';
                },
                error: () => {
                    return 'Ошибка при попытке выхода из профиля';
                },
            },
            {
                id: 'error',
            }
        );
    };

    return (
        <Page>
            <Header className="py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Настройки</HeaderTitle>
            </Header>
            <MainContent>
                <div className="border-border m-[20px] mb-0 flex flex-row gap-4 rounded-md border p-[15px]">
                    <ProfileAvatarUploader avatarSrc={user?.imagePath} />
                    <div className="my-auto flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.about}</p>
                    </div>
                </div>
                <div className="px-pageX flex flex-col gap-4">
                    <p className="font-semibold text-neutral-500">Основные</p>
                    <Menu>
                        {PROFILE_SETTING_SECTIONS.sections.map((section, index) => (
                            <MenuLink key={index} title={section.title} href={section.href} Icon={section.Icon} />
                        ))}
                    </Menu>
                    <p className="font-semibold text-neutral-500">Ваши клубы</p>
                    <Menu className="overflow-hidden">
                        {isLoading && (
                            <SkeletonList
                                className="gap-[2px]"
                                count={2}
                                classNameSkeletonItem="rounded-none h-[48px]"
                            />
                        )}
                        {!isLoading &&
                            ownedClubs?.map((club) => (
                                <MenuLink
                                    key={club.id}
                                    title={club.name}
                                    href={AUTH_PAGE.SETTING_CLUB(club.id)}
                                    imageSrc={getStaticImg(club.bannerUrl ?? '')}
                                    imageAlt={club.name}
                                />
                            ))}
                        <MenuLink href={AUTH_PAGE.PROFILE_CREATE_CLUB} title="Создать клуб" Icon={LuPlus} />
                    </Menu>
                    <p className="font-semibold text-neutral-500">Прочее</p>
                    <Menu className="mb-8">
                        <MenuItem title={'Выйти из аккаунта'} Icon={BiExit} onClick={logoutHandler} hideChevron />
                        {PROFILE_SETTING_SECTIONS.other.map((section, index) => (
                            <MenuLink
                                key={index}
                                title={section.title}
                                href={section.href}
                                Icon={section.Icon}
                                hideChevron
                            />
                        ))}
                    </Menu>
                </div>
            </MainContent>
        </Page>
    );
}
