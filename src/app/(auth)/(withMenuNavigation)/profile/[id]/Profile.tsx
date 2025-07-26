'use client';

import { useQuery } from '@tanstack/react-query';
import { motion as m } from 'framer-motion';
import { Copy, EllipsisVertical, IdCard, MessageSquare, OctagonAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
        queryFn: async () => (await clubsApi.clubsGetAllByPersonId(user.id, 0, 3)).data,
    });

    const pathname = usePathname();

    return (
        <div className="page">
            <Header className="z-50 flex w-full max-w-[1020px] flex-row items-center justify-between">
                <BackButton />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'outline'}
                            size="icon"
                            className="bg-secondary h-10 w-10 rounded-lg shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)]"
                        >
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

            <MainContent>
                <div className="bg-secondary flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
                    <div className="relative">
                        <m.div
                            className="bg-primary/40 absolute -inset-2 rounded-full blur-sm"
                            animate={{
                                rotate: 360,
                                x: [0, 2, 0, -2, 0],
                                y: [0, -2, 0, 2, 0],
                            }}
                            transition={{
                                rotate: { duration: 7, repeat: Infinity, ease: 'linear' },
                                x: { duration: 7, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
                                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' },
                            }}
                        />

                        <Avatar
                            src={user?.imagePath}
                            size={160}
                            alt="Изображение профиля"
                            className="border-background relative z-10 h-[128px] w-[128px] rounded-full border-[5px]"
                        />
                    </div>

                    <div className="flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-xl font-bold text-ellipsis">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-400">был недавно</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <MessageSquare size={20} />
                        <p className="max-w-full overflow-hidden text-sm text-ellipsis">{user?.about || '...'}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <IdCard size={20} />
                        <p className="max-w-full overflow-hidden text-sm text-ellipsis">
                            {user?.institute?.name || 'Нет института'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <p className="font-geologica text-lg font-bold">Подписки</p>
                        <Link
                            href={`${AUTH_PAGE.PROFILE}/${user.id}${AUTH_PAGE.CLUBS}`}
                            className="font-inter text-primary font-light"
                        >
                            Показать все
                        </Link>
                    </div>
                    {isLoading && <SkeletonList amount={3} />}
                    {!isLoading &&
                        userClubs &&
                        userClubs.length > 0 &&
                        userClubs.map((club, index) => (
                            <m.div
                                key={club.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: (index + 2.5) * 0.05 }}
                            >
                                <ClubCard club={club} />
                            </m.div>
                        ))}
                    {error && <p className="text-center text-neutral-500">Не удалось загрузить подписки</p>}
                </div>
            </MainContent>
        </div>
    );
}
