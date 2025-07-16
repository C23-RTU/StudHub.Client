'use client';

import { CircleAlert, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { ClubDetailDTO } from '@/api/axios-client';

import { RowClubInfo } from './RowClubInfo';

export function ClubInfo({ club }: { club: ClubDetailDTO | undefined }) {
    const router = useRouter();
    const [showInfo, setShowInfo] = useState(false);

    const displaySubscribers = useMemo(() => {
        const subscribers = club?.subscriberCount || 0;

        if (subscribers === 0) return 'Нет подписчиков';

        const lastDigit = subscribers % 10;
        const lastTwoDigits = subscribers % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${subscribers} подписчиков`;
        if (lastDigit === 1) return `${subscribers} подписчик`;
        if (lastDigit >= 2 && lastDigit <= 4) return `${subscribers} подписчика`;

        return `${subscribers} подписчиков`;
    }, [club?.subscriberCount]);

    return (
        <section className="flex flex-col gap-3">
            <h1 className="font-geologica text-center text-2xl font-bold">{club?.name}</h1>

            <div className="flex flex-col gap-2">
                <RowClubInfo onClick={() => router.push(AUTH_PAGE.CLUB_SUBSCRIBERS(club?.id as number))}>
                    <UsersRound size={18} />
                    {displaySubscribers}
                </RowClubInfo>
                {/* <RowClubInfo>
                    <MapPin size={18} />
                    г. Москва, ул. Стромынка д. 20
                </RowClubInfo> */}
                <RowClubInfo onClick={() => setShowInfo(true)}>
                    <CircleAlert size={18} />
                    Подробная информация
                </RowClubInfo>
            </div>
            <Sheet open={showInfo} onOpenChange={setShowInfo}>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle className="font-geologica text-start">Информация о клубе</SheetTitle>
                    </SheetHeader>
                    <p className="font-inter font-normal text-neutral-300">{club?.about}</p>
                </SheetContent>
            </Sheet>
        </section>
    );
}
