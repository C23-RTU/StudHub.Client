'use client';

import { LuPlus } from 'react-icons/lu';

import { Page } from '@/components/Page';
import { ProfileAvatarUploader } from '@/components/ProfileComponents/ProfileAvatar/ProfileAvatarUploader';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Menu, MenuLink } from '@/components/ui/menu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import type { PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Settings({ initUser }: { initUser: PersonDetailDTO }) {
    const { data: user } = useProfile(initUser);

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
                    <Menu>
                        <MenuLink href={AUTH_PAGE.PROFILE_SETTINGS} title="Создать клуб" Icon={LuPlus} />
                    </Menu>
                    <p className="font-semibold text-neutral-500">Прочее</p>
                    <Menu className="mb-8">
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
