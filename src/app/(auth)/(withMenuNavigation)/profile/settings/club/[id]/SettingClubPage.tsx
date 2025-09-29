'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';

import { Page } from '@/components/Page';
import { ManageUser } from '@/components/SettingClubComponents/ManageUser';
import { useSearchClubUsers } from '@/components/SettingClubComponents/hooks/useSearchClubUsers';
import { BackButton } from '@/components/ui/BackButton';
import { SearchInput } from '@/components/ui/SearchInput';
import { SkeletonList } from '@/components/ui/skeleton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO, PersonDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header';
import { MainContent } from '@/hoc/MainContent';

const RemovePopupDynamic = dynamic(
    () => import('@/components/SettingClubComponents/RemovePopup').then((mod) => mod.RemovePopup),
    {
        ssr: false,
    }
);

export function SettingClubPage({ baseClubInfo }: { baseClubInfo: ClubDetailDTO }) {
    const {
        query: { data: searchResult, isLoading: isLoadingSearchResult },
        searchQuery,
        setSearchQuery,
    } = useSearchClubUsers(baseClubInfo.id);

    const { data: clubAdmins, isLoading } = useQuery({
        queryKey: ['get-club-admins', baseClubInfo.id],
        queryFn: async () => (await clubsApi.clubsGetAdminsByClubId(baseClubInfo.id)).data,
    });

    const clubAdminsIds = useMemo(() => clubAdmins?.map((a) => a.id) || [], [clubAdmins]);

    return (
        <Page>
            <Header className="">
                <BackButton variant={'ghost'} />
                <HeaderTitle className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <Link href={AUTH_PAGE.CLUB(baseClubInfo.id)} className="w-full">
                        {baseClubInfo.name}
                    </Link>
                </HeaderTitle>
            </Header>

            <MainContent className="px-pageX py-pageY">
                <h3 className="font-geologica flex gap-2 text-lg font-semibold">
                    Администраторы клуба
                    {!isLoading && (
                        <span className="bg-secondary rounded px-2 py-1 text-sm text-white">{clubAdmins?.length}</span>
                    )}
                </h3>
                <SearchInput
                    placeholder="Введите ФИО пользователя"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {(isLoading || isLoadingSearchResult) && <SkeletonList count={3} classNameSkeletonItem="h-[48px]" />}

                {searchResult &&
                    !isLoadingSearchResult &&
                    searchResult.pages
                        ?.flatMap((page) => page)
                        .map((admin) => (
                            <ManageUser
                                useAddControl={!clubAdminsIds.includes(admin.id)}
                                clubId={baseClubInfo.id}
                                user={admin as PersonDetailDTO}
                                key={admin?.id || Date.now()}
                            />
                        ))}

                {!searchResult &&
                    clubAdmins?.map((admin) => <ManageUser clubId={baseClubInfo.id} user={admin} key={admin.id} />)}
            </MainContent>
            <RemovePopupDynamic clubId={baseClubInfo.id} />
        </Page>
    );
}
