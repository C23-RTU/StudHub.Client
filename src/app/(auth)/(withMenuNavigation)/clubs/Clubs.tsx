'use client';

import { useQuery } from '@tanstack/react-query';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { SkeletonClubsList } from '@/components/ClubComponents/SkeletonClubsList';

export function Clubs() {
    const { data: clubs, isLoading } = useQuery({
        queryKey: ['fetch-clubs'],
        queryFn: async () => (await clubsApi.clubsGetAll()).data,
    });

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Клубы</HeaderTitle>
            </Header>

            <MainContent>
                <SearchInput placeholder="Поиск по клубам..." />

                <div className="flex flex-col gap-4">
                    {isLoading && <SkeletonClubsList />}
                    {clubs?.map((club, index) => (
                        <ClubCard
                            key={index}
                            imageUrl={club.imageUrl}
                            name={club.name}
                            description={club.about}
                            clubId={club.id}
                        />
                    ))}
                    <Button onClick={() => {}}>
                        <p>Показать все</p>
                        <ChevronRight />
                    </Button>
                </div>
            </MainContent>
        </div>
    );
}
