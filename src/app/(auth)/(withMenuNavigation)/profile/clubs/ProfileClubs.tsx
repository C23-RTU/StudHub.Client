import Link from 'next/link';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import type { ClubDetailDTO } from '@/api/axios-client';

import { HeaderTitle } from '@/hoc/Header/Header';

type Props = {
    clubs: ClubDetailDTO[];
};

export default function ProfileClubs({ clubs }: Props) {
    return (
        <div className="page">
            <div className="sticky top-1 left-0 flex items-center mb-4 gap-5">
                <Link href={`/profile`}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписки</HeaderTitle>
            </div>
            <div className="space-y-4">
                {clubs?.length === 0 ? (
                    <p className="text-center text-neutral-400">Вы пока не подписаны ни на один клуб</p>
                ) : (
                    clubs.map((club) => <ClubCard key={club.id} club={club} showSubscribe />)
                )}
            </div>
        </div>
    );
}
