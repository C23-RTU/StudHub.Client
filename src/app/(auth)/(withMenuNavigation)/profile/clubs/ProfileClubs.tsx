import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import type { ClubDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';

type Props = {
    clubs: ClubDetailDTO[];
};

export default function ProfileClubs({ clubs }: Props) {
    return (
        <div className="page">
            <Header className='justify-start gap-4'>
                <BackButton />
                <HeaderTitle>Подписки</HeaderTitle>
            </Header>
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
