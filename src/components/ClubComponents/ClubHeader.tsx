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

export function ClubHeader({ club }: { club: ClubDetailDTO | undefined }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header>
            <div className="fixed flex flex-row justify-between items-center z-50 p-4 w-full max-w-[1024px]">
                <div className="flex flex-row items-center">
                    <BackButton onClick={() => router.back()} />
                    <p
                        className="text-lg ml-4 font-bold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer"
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
                            className="rounded-lg w-10 h-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary"
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
                <LoaderImage
                    src={club?.bannerUrl ? getStaticImg(club.bannerUrl) : '/img/blank.png'}
                    height={250}
                    width={1000}
                    alt={'banner'}
                    className="rounded-b-3xl w-full h-[250px] object-cover"
                />
            </div>

            <div className="w-full h-full flex items-center justify-center mt-[-70px]">
                <LoaderImage
                    src={
                        club?.imageUrl
                            ? getStaticImg(club.imageUrl)
                            : 'https://gravatar.com/avatar/d99cc6ace66fc8bd197c30c876b7224007211f4572ef6d8444693f67b4c33ab1?size=80'
                    }
                    height={128}
                    width={128}
                    alt={'avatar'}
                    className="rounded-full border-[5px] w-[128px] h-[128px] border-background"
                />
            </div>
        </header>
    );
}
