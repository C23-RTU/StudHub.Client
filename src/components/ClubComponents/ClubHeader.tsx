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

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { Skeleton } from '../ui/skeleton';

export function ClubHeader({ club, isLoading }: { club: ClubDetailDTO | undefined, isLoading?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header>
            <div className="fixed flex flex-row justify-between items-center z-50 p-4 w-full max-w-[1020px]">
                <div className="flex flex-row items-center">
                    <BackButton onClick={() => router.back()} />
                    <p
                        className="text-lg ml-4 font-bold shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText('@IKB_MIREA');
                            toast.success('Тег скопирован');
                        }}
                    >
                        @IKB_MIREA
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'outline'}
                            size="icon"
                            className="rounded-lg w-10 h-10 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-secondary"
                        >
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(pathname);
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
            <div className="w-full flex items-center justify-center">
                {isLoading ? (
                    <Skeleton className='w-full h-[250px] rounded-b-3xl' />
                ) : (

                <LoaderImage
                    src={club?.bannerUrl ? getStaticImg(club.bannerUrl) : '/img/default-club-banner.jpg'}
                    height={250}
                    width={1000}
                    alt={'banner'}
                    className="rounded-b-3xl w-full h-[250px] object-cover"
                />
                )}
            </div>

            <div className="w-full h-full flex items-center justify-center mt-[-70px]">
                {isLoading ? (
                    <Skeleton className='w-[128px] h-[128px] rounded-full border-[5px] border-background' />
                ) : (
                <LoaderImage
                    src={
                        club?.imageUrl
                            ? getStaticImg(club.imageUrl)
                            : '/img/default-club-avatar.png'
                    }
                    height={128}
                    width={128}
                    alt={'avatar'}
                    className="rounded-full border-[5px] w-[128px] h-[128px] border-background"
                />
                )}
            </div>
        </header>
    );
}
