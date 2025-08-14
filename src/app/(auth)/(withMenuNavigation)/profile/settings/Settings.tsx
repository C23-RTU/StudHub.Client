'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

import { Page } from '@/components/Page';
import { ProfileAvatarUploader } from '@/components/ProfileComponents/ProfileAvatar/ProfileAvatarUploader';
import SettingsClubSection from '@/components/ProfileComponents/SettingClubSection';
import SettingsSection from '@/components/ProfileComponents/SettingSection';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import type { PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Settings({ initUser }: { initUser: PersonDetailDTO }) {
    const { data: user } = useProfile(initUser);

    return (
        <Page className="border-border min-h-screen border-x p-0">
            <Header className="px-pageX justify-start gap-3 py-[16px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Настройки</HeaderTitle>
            </Header>
            <MainContent>
                <div className="border-border m-[20px] mb-0 flex flex-row gap-4 rounded-md border p-[20px]">
                    <ProfileAvatarUploader avatarSrc={user?.imagePath} />
                    <div className="my-auto flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.about}</p>
                    </div>
                </div>
                <div className="px-pageX flex flex-col gap-4">
                    <p className="font-semibold text-neutral-500">Аккаунт</p>
                    <ul className="border-border bg-background-light flex flex-col rounded-md border">
                        {PROFILE_SETTING_SECTIONS.sections.map((section, index) => (
                            <SettingsSection
                                key={index}
                                title={section.title}
                                href={section.href}
                                Icon={section.Icon}
                            />
                        ))}
                    </ul>
                    <p className="font-semibold text-neutral-500">Ваши клубы</p>
                    <ul className="border-border bg-background-light flex flex-col rounded-md border">
                        {PROFILE_SETTING_SECTIONS.clubs.map((club, index) => (
                            <SettingsClubSection
                                key={index}
                                title={club.title}
                                href={club.href}
                                imageUrl={club.imageUrl}
                            />
                        ))}

                        <Link
                            href={`${AUTH_PAGE.PROFILE_SETTINGS}/create-club`}
                            className="border-border flex flex-row items-center gap-4 border-b px-4 py-3 text-neutral-800 select-none last:border-none dark:text-neutral-200"
                        >
                            <LuPlus size={20} />
                            <p className="text-neutral-700 dark:text-neutral-300">Создать клуб</p>
                            <ChevronRightIcon size={20} className="ml-auto" />
                        </Link>
                    </ul>
                    <p className="font-semibold text-neutral-500">Прочее</p>
                    <ul className="border-border bg-background-light flex flex-col rounded-md border">
                        {PROFILE_SETTING_SECTIONS.other.map((section, index) => (
                            <SettingsSection
                                key={index}
                                title={section.title}
                                href={section.href}
                                Icon={section.Icon}
                                hideChevron
                            />
                        ))}
                    </ul>
                </div>
            </MainContent>
        </Page>
    );
}
