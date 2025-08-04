import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

import SettingsClubSection from '@/components/ProfileComponents/SettingClubSection';
import SettingsSection from '@/components/ProfileComponents/SettingSection';
import { PROFILE_SETTING_SECTIONS } from '@/components/ProfileComponents/profile-section.config';
import { Avatar } from '@/components/ui/Avatar/Avatar';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default function Settings({ user }: { user: PersonDetailDTO }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Настройки</HeaderTitle>
            </Header>
            <MainContent>
                <div className="flex flex-row gap-4 rounded-md border border-neutral-800 bg-neutral-900 p-4 shadow-md">
                    <Avatar src={user?.imagePath} size={64} alt={'Изображение профиля'} />
                    <div className="my-auto flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-400">{user?.about}</p>
                    </div>
                </div>
                <p className="font-semibold text-neutral-500">Аккаунт</p>
                <ul className="flex flex-col rounded-md border border-neutral-800 bg-neutral-900 shadow-md">
                    {PROFILE_SETTING_SECTIONS.sections.map((section, index) => (
                        <SettingsSection key={index} title={section.title} href={section.href} Icon={section.Icon} />
                    ))}
                </ul>
                <p className="font-semibold text-neutral-500">Ваши клубы</p>
                <ul className="flex flex-col rounded-md border border-neutral-800 bg-neutral-900 shadow-md">
                    {PROFILE_SETTING_SECTIONS.clubs.map((club, index) => (
                        <SettingsClubSection key={index} title={club.title} href={club.href} imageUrl={club.imageUrl} />
                    ))}

                    <Link
                        href={`${AUTH_PAGE.PROFILE_SETTINGS}/create-club`}
                        className="flex flex-row items-center gap-4 px-4 py-3 text-neutral-200 select-none"
                    >
                        <LuPlus size={20} />
                        <p className="text-neutral-300">Создать клуб</p>
                        <ChevronRightIcon size={20} className="ml-auto" />
                    </Link>
                </ul>
                <p className="font-semibold text-neutral-500">Прочее</p>
                <ul className="flex flex-col rounded-md border border-neutral-800 bg-neutral-900 shadow-md">
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
            </MainContent>
        </div>
    );
}
