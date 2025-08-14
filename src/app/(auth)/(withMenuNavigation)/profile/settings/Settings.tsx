'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

import { Page } from '@/components/Page';
import { ProfileAvatarUploader } from '@/components/ProfileComponents/ProfileAvatar/ProfileAvatarUploader';
import SettingsClubSection from '@/components/ProfileComponents/SettingClubSection';
import SettingsSection from '@/components/ProfileComponents/SettingSection';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useProfile } from '@/hooks/useProfile';

import type { PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Settings({ initUser }: { initUser: PersonDetailDTO }) {
    const { data: user } = useProfile(initUser);

    return (
        <Page className="border-border min-h-screen border-x bg-neutral-50 p-0">
            <Header className="border-border px-pageX py-pageY mb-0 flex flex-row items-center border-b">
                <HeaderTitle>Настройки</HeaderTitle>
            </Header>
            <MainContent>
                <div className="m-[20px] mb-0 flex flex-row gap-4 rounded-md border border-neutral-300 bg-neutral-100 p-[20px]">
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
                    <ul className="flex flex-col rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
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
                    <ul className="flex flex-col rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
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
                            className="flex flex-row items-center gap-4 border-b border-neutral-300 px-4 py-3 text-neutral-800 select-none last:border-none dark:border-neutral-800 dark:text-neutral-200"
                        >
                            <LuPlus size={20} />
                            <p className="text-neutral-700 dark:text-neutral-300">Создать клуб</p>
                            <ChevronRightIcon size={20} className="ml-auto" />
                        </Link>
                    </ul>
                    <p className="font-semibold text-neutral-500">Прочее</p>
                    <ul className="flex flex-col rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
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
