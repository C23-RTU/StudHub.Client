import type { PersonDetailDTO } from "@/api/axios-client";
import { SettingBadge } from "@/components/Badge/SettingBadge/SettingBadge";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Header, HeaderTitle } from "@/hoc/Header/Header";
import { MainContent } from "@/hoc/MainContent/MainContent";
import { AUTH_PAGE } from "@/lib/config/routes.config";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type { IconType } from "react-icons/lib";
import {LuBell, LuDoorOpen, LuMail, LuPlus, LuUserPen} from "react-icons/lu";
import Image from "next/image";

type SettingsSectionProps = {
    href: string;
    title: string;
    Icon: IconType;
    hideChevron?: boolean;
}

function SettingsSection({href, title, Icon, hideChevron}: SettingsSectionProps) {
    return (
        <Link href={href} className="flex items-center py-3 px-4 flex-row gap-4 select-none border-b border-neutral-800 last:border-none  text-neutral-200">
            <Icon size={20}/>
            <p className="text-neutral-300">{title}</p>
            {!hideChevron && !hideChevron && <ChevronRightIcon size={20} className="ml-auto"/>}
        </Link>
    )
}


type SettingsClubProps = {
    href: string;
    title: string;
    imageUrl: string;

}


function SettingsClub({href, title, imageUrl}: SettingsClubProps) {
    return (
        <Link href={href} className="flex items-center py-3 px-4 flex-row gap-4 select-none border-b border-neutral-800 last:border-none  text-neutral-200">
            <Image src={imageUrl} alt="Аватарка клуба" width={128} height={128} className="rounded-full size-[20px]" />
            <p className="text-neutral-300">{title}</p>
            <ChevronRightIcon size={20} className="ml-auto"/>
        </Link>
    )
}


type Props = {
    user: PersonDetailDTO;
}

export default function Settings({user}: Props) {
    const sections = [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/edit`,
            title: "Изменить профиль",
            Icon: LuUserPen
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: "Уведомления",
            Icon: LuBell
        },
    ]

    const clubs = [
        {
            href: AUTH_PAGE.PROFILE_SETTINGS,
            title: "Клуб 1",
            imageUrl: "https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=256",
        },
        {
            href: AUTH_PAGE.PROFILE_SETTINGS,
            title: "Клуб 2",
            imageUrl: "https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=256",
        }
    ]

    const other = [
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: "Выйти из аккаунта",
            Icon: LuDoorOpen
        },
        {
            href: `${AUTH_PAGE.PROFILE_SETTINGS}/notifications`,
            title: "Сообщить об ошибке",
            Icon: LuMail
        },
    ]
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Настройки</HeaderTitle>
                <Link href={AUTH_PAGE.PROFILE_SETTINGS}>
                    <SettingBadge />
                </Link>
            </Header>
            <MainContent>
                <div className="flex flex-row gap-4 p-4 bg-neutral-900 shadow-md rounded-md border border-neutral-800">
                    <Avatar src={user?.imagePath} size={64} alt={'Изображение профиля'} />
                    <div className="flex flex-col my-auto gap-0 ">
                        <p className="text-lg font-semibold font-geologica max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-400">{user?.about}</p>
                    </div>
                </div>
                <p className="text-neutral-500 font-semibold">Аккаунт</p>
                <ul className="flex flex-col bg-neutral-900 border shadow-md border-neutral-800 rounded-md">
                    {sections.map((section, index)=> (
                        <SettingsSection key={index} title={section.title} href={section.href} Icon={section.Icon}/>
                    ))}
                </ul>
                <p className="text-neutral-500 font-semibold">Ваши клубы</p>
                <ul className="flex flex-col bg-neutral-900 border shadow-md border-neutral-800 rounded-md">
                    {clubs.map((club, index)=> (
                        <SettingsClub key={index} title={club.title} href={club.href} imageUrl={club.imageUrl}/>
                    ))}

                    <Link href={`${AUTH_PAGE.PROFILE_SETTINGS}/create-club`} className="flex items-center py-3 px-4 flex-row gap-4 select-none  text-neutral-200">
                        <LuPlus size={20}/>
                        <p className="text-neutral-300">Создать клуб</p>
                        <ChevronRightIcon size={20} className="ml-auto"/>
                    </Link>
                </ul>
                <p className="text-neutral-500 font-semibold">Прочее</p>
                <ul className="flex flex-col bg-neutral-900 border shadow-md border-neutral-800 rounded-md">
                    {other.map((section, index)=> (
                        <SettingsSection key={index} title={section.title} href={section.href} Icon={section.Icon} hideChevron/>
                    ))}
                </ul>
            </MainContent>
        </div>
    )
}
