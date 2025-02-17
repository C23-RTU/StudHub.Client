import Image from 'next/image';
import { HiIdentification } from 'react-icons/hi2';
import { IoMdMail } from 'react-icons/io';
import { MdModeComment } from 'react-icons/md';

import { SettingBadge } from '@/components/Badge/SettingBadge/SettingBadge';
import { Avatar } from '@/components/ui/Avatar/Avatar';

import type { ClubDetailDTO, PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export default async function Profile({ user, userClubs }: { user: PersonDetailDTO; userClubs: ClubDetailDTO[] }) {
    console.log(userClubs);

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Профиль</HeaderTitle>
                <SettingBadge />
            </Header>

            <MainContent>
                <div className="flex flex-row gap-4">
                    <Avatar src={user.imagePath} size={80} alt={'Изображение профиля'} />
                    <div className="flex flex-col my-auto gap-0">
                        <p className="text-xl font-bold font-geologica max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                            Костя Жигайло
                        </p>
                        <p className="text-sm text-neutral-400">был в сети 6 минут назад</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <MdModeComment size={20} />
                        <p className="text-sm font-geologica">Дают - бери, не дают - отбери.</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <IoMdMail size={20} />
                        <p className="text-sm font-geologica">zero@kostyazero.com</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <HiIdentification size={20} />
                        <p className="text-sm font-geologica">Студент ИТУ </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica font-bold text-lg">Клубы</p>
                        <p className="font-inter font-light text-primary">Показать все</p>
                    </div>
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica font-bold text-lg">Достижения</p>
                        <p className="font-inter font-light text-primary">Показать все</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <AchievementCard />
                        <AchievementCard />
                    </div>
                </div>
            </MainContent>
        </div>
    );
}

async function AchievementCard() {
    return (
        <figure className="flex flex-col gap-4 p-4 rounded-xl bg-neutral-800 items-center text-center">
            <Image
                src={
                    'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=80'
                }
                alt={'Изображение клуба'}
                width={64}
                height={64}
                className="rounded-lg w-[64px] h-[64px]"
            />
            <div className="flex flex-col gap-2">
                <p className="font-geologica font-bold text-lg leading-none">Отчислен</p>
                <p className="text-sm font-inter text-neutral-400 max-h-[2.5rem] overflow-hidden text-ellipsis">
                    Отчислится из РТУ МИРЭА
                </p>
                <p className="text-sm font-inter text-neutral-400">01.01.1970</p>
            </div>
        </figure>
    );
}

async function ClubCard() {
    return (
        <figure className="flex flex-row gap-4">
            <Image
                src={
                    'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=80'
                }
                alt={'Изображение клуба'}
                width={64}
                height={64}
                className="rounded-lg w-[64px] h-[64px]"
            />
            <div className="flex flex-col justify-between">
                <p className="font-geologica font-bold text-lg leading-none">Клуб ИТУ</p>
                <p className="text-sm font-inter text-neutral-400 max-h-[2.5rem] overflow-hidden text-ellipsis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu
                </p>
            </div>
        </figure>
    );
}
