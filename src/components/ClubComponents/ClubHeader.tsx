'use client';

import { EllipsisVertical, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoAlertCircle, IoCopy } from 'react-icons/io5';

import { useClubReportDialogStore } from '@/components/ClubComponents/store/clubReportDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useClubsRole } from '@/hooks/useClubsRole';

import type { ClubDetailDTO } from '@/api/axios-client';

import { BackButton } from '../ui/BackButton';
import { Button } from '../ui/button';

import { CLUB_ROLES } from '@/lib/enums/club-roles.enum';

export function ClubHeader({ club }: { club: ClubDetailDTO }) {
    const pathname = usePathname();
    const { checkRole } = useClubsRole();
    const reportOpen = useClubReportDialogStore((store) => store.openDialog);

    return (
        <header className="w-fullitems-center relative mx-auto flex">
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
                <div className="flex gap-3">
                    {checkRole(club?.id) === CLUB_ROLES.OWNER && (
                        <Link
                            href={AUTH_PAGE.SETTING_CLUB(club?.id)}
                            className={
                                'border-border bg-background text-text hover:bg-background-light dark:bg-background-light dark:hover:bg-background-dimmed flex size-10 items-center justify-center rounded-lg border'
                            }
                        >
                            <Settings />
                        </Link>
                    )}

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
                                className="text-text"
                            >
                                <IoCopy className="text-neutral-400" />
                                Скопировать ссылку
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive" onClick={() => reportOpen(club.id)}>
                                <IoAlertCircle />
                                Пожаловаться
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
