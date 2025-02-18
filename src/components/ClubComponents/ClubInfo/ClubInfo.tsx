'use client';

import { useQuery } from '@tanstack/react-query';
import { CircleAlert, MapPin, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';

import { RowClubInfo } from './RowClubInfo';

export function ClubInfo({ clubId }: { clubId: string }) {
    const router = useRouter();
    const [showInfo, setShowInfo] = useState(false);

    const { data: club } = useQuery({
        queryKey: ['fetch-club', clubId],
        queryFn: async () => (await clubsApi.clubsGetById(Number(clubId))).data,
    });

    return (
        <div>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-center">{club?.name}</h1>
                <p className="text-center opacity-50">{club?.about}</p>
            </div>

            <div className="flex flex-col gap-2 mt-5">
                <RowClubInfo onClick={() => router.push(AUTH_PAGE.CLUB_SUBSCRIBERS(clubId))}>
                    <UsersRound size={18} />
                    1.1М подписчиков
                </RowClubInfo>
                <RowClubInfo>
                    <MapPin size={18} />
                    г. Москва, ул. Стромынка д.2
                </RowClubInfo>
                <RowClubInfo onClick={() => setShowInfo(true)}>
                    <CircleAlert size={18} />
                    Подробная информация
                </RowClubInfo>
            </div>
            <Sheet open={showInfo} onOpenChange={setShowInfo}>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle className="text-start">Информация о клубе</SheetTitle>
                    </SheetHeader>
                    <p className="font-normal font-inter text-neutral-300">{club?.about}</p>
                </SheetContent>
            </Sheet>
        </div>
    );
}
