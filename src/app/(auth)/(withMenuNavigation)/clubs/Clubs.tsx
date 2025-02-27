'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';
import { Button } from '@/components/ui/button';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Clubs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery] = useDebounce(searchQuery, 300);

    const { data: clubs, isLoading } = useQuery({
        queryKey: ['fetch-clubs', debouncedQuery],
        queryFn: async () => {
            if (debouncedQuery) {
                return (await clubsApi.clubsSearch(debouncedQuery)).data;
            }
            return (await clubsApi.clubsGetAll()).data;
        },
    });

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Клубы</HeaderTitle>
            </Header>

            <MainContent>
                <SearchInput
                    placeholder="Поиск по клубам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex flex-col gap-4">
                    {isLoading && <SkeletonList />}
                    {clubs?.map((club, index) => (
                        <ClubCard
                            key={index}
                            club={club}
                            showSubscribe
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
