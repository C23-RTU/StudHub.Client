import { Copy, EllipsisVertical, OctagonAlert } from 'lucide-react';
import Link from 'next/link';
import { BiMessageSquare, BiSolidIdCard } from 'react-icons/bi';
import { IoSettingsSharp } from 'react-icons/io5';

import { Page } from '@/components/Page';
import { Avatar } from '@/components/ui/Avatar';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PersonDetailDTO } from '@/api/axios-client/models';

import UserProfileClubs from '@/app/(auth)/(withMenuNavigation)/profile/[id]/UserProfileClubs';
import { Header } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

type Props = {
    user: PersonDetailDTO;
    isCurrent: boolean;
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default function Profile({ user, isCurrent }: Props) {
    return (
        <Page>
            <Header className="items-center justify-between border-0 p-[20px] py-[16px]">
                <BackButton variant={'outline'} />
                <p className={'font-geologica mr-auto ml-2 text-xl font-semibold'}>Профиль</p>

                {isCurrent && (
                    <Link href={AUTH_PAGE.PROFILE_SETTINGS} className={'ml-auto'}>
                        <Button size={'icon'} variant={'outline'}>
                            <IoSettingsSharp />
                        </Button>
                    </Link>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size="icon">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Copy />
                            Скопировать ссылку
                        </DropdownMenuItem>
                        {!isCurrent && (
                            <DropdownMenuItem variant={'destructive'}>
                                <OctagonAlert stroke="#FF0000" />
                                Пожаловаться
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </Header>

            <MainContent className="gap-0">
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
                <div className="flex flex-col gap-4 p-[20px]">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica text-xl font-bold">Подписки</p>
                        <Link href={AUTH_PAGE.USER_PROFILE_CLUBS(user.id)} className="text-primary">
                            Показать все
                        </Link>
                    </div>
                    <UserProfileClubs id={user.id} />
                </div>
            </MainContent>
        </Page>
    );
}
