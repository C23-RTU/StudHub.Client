import { CircleAlert, MapPin, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { RowClubInfo } from './RowClubInfo';

export function ClubInfo({ clubId }: { clubId: string }) {
    const router = useRouter();

    return (
        <>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-center">ИКБ РТУ МИРЭА</h1>

                <p className="text-center opacity-50">Будет падать - будем думать</p>

                {/* <p className="text-center">
                          Институт кибербезопасности и цифровых технологий — структурное подразделение МИРЭА — Российского
                          технологического университета, реализующее подготовку студентов в области обеспечения
                          информационной безопасности, защиты национального киберпространства, экономической
                          безопасности...
                      </p> */}
            </div>

            <div className="flex flex-col gap-2 mt-5">
                <RowClubInfo onClick={() => router.push(AUTH_PAGE.CLUB_SUBSCRIBERS(clubId))}>
                    <UsersRound size={18} />
                    1.1М подписчиков
                </RowClubInfo>
                <RowClubInfo>
                    <MapPin size={18} />
                    г. Москва, ул. Стромынка д.2f
                </RowClubInfo>
                <RowClubInfo>
                    <CircleAlert size={18} />
                    Подробная информация
                </RowClubInfo>
            </div>
        </>
    );
}
