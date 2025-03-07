'use client';

import { useQuery } from '@tanstack/react-query';
import { CircleAlert, MapPin, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';

import { RowClubInfo } from './RowClubInfo';
import type { ClubDetailDTO } from '@/api/axios-client';

export function ClubInfo({ club, clubId }: { club: ClubDetailDTO | undefined, clubId: string }) {
    const router = useRouter();
    const [showInfo, setShowInfo] = useState(false);

    function getSubscribersText(count: number) {
        if (count === 0) return 'Нет подписчиков';
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${count} подписчиков`;
        if (lastDigit === 1) return `${count} подписчик`;
        if (lastDigit >= 2 && lastDigit <= 4) return `${count} подписчика`;
        return `${count} подписчиков`;
    }

    const { data: subscribers, isLoading } = useQuery({
        queryKey: ['club-subscribers', clubId],
        queryFn: async () => (await clubsApi.clubsGetAllByClubId(Number(clubId))).data,
    });

    return (
        <div>
            <div className="flex flex-col my-3">
                <h1 className="text-2xl font-bold text-center">{club?.name}</h1>
            </div>

            <div className="flex flex-col gap-2">
                <RowClubInfo onClick={() => router.push(AUTH_PAGE.CLUB_SUBSCRIBERS(clubId))}>
                    <UsersRound size={18} />
                    {isLoading ? '...' : getSubscribersText(subscribers?.length || 0)}
                </RowClubInfo>
                <RowClubInfo>
                    <MapPin size={18} />
                    г. Москва, ул. Стромынка д. 20
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
