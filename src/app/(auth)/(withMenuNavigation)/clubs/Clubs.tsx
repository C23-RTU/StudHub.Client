'use client';

import { m } from 'framer-motion';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import { Page } from '@/components/Page';
import { SkeletonList } from '@/components/Skeletons/SkeletonList';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Clubs() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery] = useDebounce(searchQuery, 300);

    const {
        ref,
        infiniteQuery: { data: clubs, isLoading },
    } = useInfinityScroll({
        queryKey: ['fetch-clubs', debouncedQuery],
        queryFn: async ({ pageParam = 0 }) => {
            if (debouncedQuery) {
                return (await clubsApi.clubsSearch(debouncedQuery, pageParam, 10)).data;
            }
            return (await clubsApi.clubsGetAll(pageParam, 10)).data;
        },
        pageSize: 10,
    });

    return (
        <Page className="p-0">
            <Header className="border-border mb-0 border-b">
                <HeaderTitle>Клубы</HeaderTitle>
            </Header>

            <MainContent className="p-[20px]">
                <SearchInput
                    placeholder="Поиск по клубам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="flex flex-col gap-4">
                    {isLoading && <SkeletonList amount={5} />}
                    {clubs?.pages
                        .flatMap((page) => page)
                        .map((club, index) => (
                            <m.div
                                key={club.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: (index + 2.5) * 0.05, duration: 0.3, ease: 'easeOut' }}
                            >
                                <ClubCard club={club} showSubscribe />
                            </m.div>
                        ))}
                    <div ref={ref}></div>
                </div>
            </MainContent>
        </Page>
    );
}
