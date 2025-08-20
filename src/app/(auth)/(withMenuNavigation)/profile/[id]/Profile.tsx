'use client';

import { useQuery } from '@tanstack/react-query';
import { Copy, EllipsisVertical, OctagonAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { BiMessageSquare, BiSolidIdCard } from 'react-icons/bi';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
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
import { SkeletonList } from '@/components/ui/skeleton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client/models';

import { Header } from '@/hoc/Header/Header';
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
        queryKey: [user.id, 'fetch-profile-user-clubs'],
        queryFn: async () => (await clubsApi.clubsGetByPersonId(user.id, 0, 3)).data,
    });

    const pathname = usePathname();

    return (
        <Page>
            <Header className="justify-between border-0 p-[20px] py-[16px]">
                <BackButton variant={'outline'} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size="icon">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(`https://setka-rtu.ru${pathname}`);
                                toast.success('Ссылка скопирована');
                            }}
                        >
                            <Copy />
                            Скопировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#FF0000]">
                            <OctagonAlert stroke="#FF0000" />
                            Пожаловаться
                        </DropdownMenuItem>
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
                        <Link href={AUTH_PAGE.PROFILE_CLUBS} className="text-primary">
                            Показать все
                        </Link>
                    </div>
                    {isLoading && <SkeletonList />}
                    {!isLoading &&
                        userClubs &&
                        userClubs.length > 0 &&
                        userClubs.map((club) => <ClubCard key={club.id} club={club} />)}
                    {error && (
                        <p className="text-center text-neutral-500">Не удалось загрузить подписки пользователя</p>
                    )}
                </div>
            </MainContent>
        </Page>
    );
}
