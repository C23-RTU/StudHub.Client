'use client';

import { Copy, EllipsisVertical, OctagonAlert } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { ClubDetailDTO } from '@/api/axios-client';

import LoaderImage from '../ImageLoader/ImageLoader';
import { BackButton } from '../ui/BackButton/BackButton';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

export function ClubHeader({ club, isLoading }: { club: ClubDetailDTO | undefined; isLoading?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header>
            <div className="fixed z-50 -mt-[1px] flex w-full max-w-[1020px] flex-row items-center justify-between bg-gradient-to-b from-neutral-900/80 to-neutral-900/0 p-4">
                <div className="flex flex-row items-center">
                    <BackButton onClick={() => router.back()} />
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
            </div>
            <div className="flex w-full items-center justify-center">
                {isLoading ? (
                    <Skeleton className="h-[250px] w-full rounded-b-3xl" />
                ) : (
                    <LoaderImage
                        src={club?.bannerUrl ? getStaticImg(club.bannerUrl) : '/img/default-club-banner.jpg'}
                        height={250}
                        width={1000}
                        alt={'banner'}
                        className="h-[250px] w-full rounded-b-3xl object-cover"
                    />
                )}
            </div>

            <div className="bg-secondary mt-[-65px] flex h-full w-full items-center justify-center">
                {isLoading ? (
                    <Skeleton className="border-background h-[128px] w-[128px] rounded-full border-[5px]" />
                ) : (
                    <LoaderImage
                        src={club?.imageUrl ? getStaticImg(club.imageUrl) : '/img/default-club-avatar.png'}
                        height={128}
                        width={128}
                        alt={'avatar'}
                        className="border-background h-[128px] w-[128px] rounded-full border-[5px]"
                    />
                )}
            </div>
        </header>
    );
}
