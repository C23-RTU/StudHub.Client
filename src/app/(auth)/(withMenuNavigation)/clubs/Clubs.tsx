'use client';

import { m } from 'framer-motion';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ClubCard } from '@/components/ClubComponents/ClubCard';
import Loader from '@/components/Loader';
import { Page } from '@/components/Page';
import { SearchInput } from '@/components/ui/SearchInput';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { clubsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';

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
                return (await clubsApi.clubsSearch(debouncedQuery, pageParam, 50)).data;
            }
            return (await clubsApi.clubsGetAll(pageParam, 50)).data;
        },
        pageSize: 10,
    });

    return (
        <Page>
            <Header className="flex w-full max-w-full flex-col items-start">
                <HeaderTitle>Клубы</HeaderTitle>

                <SearchInput
                    placeholder="Поиск по клубам..."
                    value={searchQuery}
                    className="w-full"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Header>

            <MainContent className="p-[20px]">
                <div className="flex max-w-[600px] flex-col gap-4">
                    {isLoading && <Loader className="mx-auto mt-10" />}
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
