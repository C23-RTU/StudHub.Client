'use client';

import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { IoAlertCircle, IoCopy } from 'react-icons/io5';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client';

import LoaderImage from '../ImageLoader/ImageLoader';
import { BackButton } from '../ui/BackButton';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

const SubscribeButtonDynamic = dynamic(
    () => import('./SubscribeButtons/SubscribeButton').then((mod) => mod.SubscribeButton),
    {
        ssr: false,
        loading: () => <Skeleton className="bg-background h-10 w-full rounded-md" />,
    }
);

export function ClubHeader({ initClubData }: { initClubData: ClubDetailDTO }) {
    const pathname = usePathname();

    const { data: club } = useQuery({
        queryKey: ['fetch-club', initClubData?.id],
        queryFn: async () => (await clubsApi.clubsGetById(Number(initClubData?.id))).data,
        initialData: initClubData,
        enabled: !!initClubData,
    });

    const displaySubscribers = useMemo(() => {
        const subscribers = club?.subscriberCount || 0;

        const lastDigit = subscribers % 10;
        const lastTwoDigits = subscribers % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `подписчиков`;
        if (lastDigit === 1) return `подписчик`;
        if (lastDigit >= 2 && lastDigit <= 4) return ` подписчика`;

        return `подписчиков`;
    }, [club?.subscriberCount]);

    return (
        <header className="border-border relative mx-auto flex w-full max-w-[600px] flex-col items-center border-x-0 lg:border-x">
            <div className="fixed z-50 -mt-[1px] flex w-full max-w-[600px] flex-row justify-between bg-gradient-to-b from-neutral-900/80 to-neutral-900/0 p-4">
                <div className="flex flex-row items-center">
                    <BackButton variant={'outline'} className={'size-10'} />
                    {/* <p
                        className="text-lg ml-4 font-bold shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),0_6.7px_5.3px_rgba(0,0,0,0.048),0_12.5px_10px_rgba(0,0,0,0.06),0_22.3px_17.9px_rgba(0,0,0,0.072),0_41.8px_33.4px_rgba(0,0,0,0.086),0_100px_80px_rgba(0,0,0,0.12)] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText('@IKB_MIREA');
                            toast.success('Тег скопирован');
                        }}
                    >
                        @IKB_MIREA
                    </p> */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant={'outline'} className="text-text size-10">
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
                            <IoCopy className="text-text" />
                            Скопировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                            <IoAlertCircle className="text-red-400" />
                            Пожаловаться
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex w-full items-center justify-center">
                <LoaderImage
                    src={club?.bannerUrl ? getStaticImg(club.bannerUrl) : '/img/default-club-banner.jpg'}
                    height={250}
                    width={1000}
                    alt={'banner'}
                    className="h-[200px] w-full object-cover"
                />
            </div>

            <div className="mt-[-40px] flex h-full w-full flex-row px-4">
                <LoaderImage
                    src={club?.imageUrl ? getStaticImg(club.imageUrl) : '/img/default-club-avatar.png'}
                    height={128}
                    width={128}
                    alt={'avatar'}
                    className="border-background-light size-[100px] rounded-full border-[5px] p-0"
                />
                <SubscribeButtonDynamic
                    clubId={club?.id}
                    isBig={true}
                    className="z-40 mt-[56px]"
                    subscribed={club?.isUserSubscribed}
                />
            </div>
            <div className="flex w-full flex-col gap-2 p-4 pt-2 pb-0">
                <h1 className="font-geologica text-text text-lg font-bold">{club?.name}</h1>
                <p className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">{club?.about}</p>
                <Link href={`/clubs/${club.id}/subscribers`} className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{club?.subscriberCount}</span>{' '}
                    {displaySubscribers}
                </Link>
            </div>

            {/* <div className="bg-secondary flex flex-col gap-5 rounded-b-xl px-5 pb-5"> */}
            {/*     <ClubInfo club={club} /> */}
            {/* </div> */}
        </header>
    );
}
