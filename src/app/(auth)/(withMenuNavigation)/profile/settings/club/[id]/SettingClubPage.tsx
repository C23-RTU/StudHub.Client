'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Page } from '@/components/Page';
import { ManageUser } from '@/components/SettingClubComponents/ManageUser';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import { SkeletonList } from '@/components/ui/skeleton';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client';

import { useManageClub } from '../../../../../../../components/SettingClubComponents/hooks/useManageClub';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const RemovePopupDynamic = dynamic(
    () => import('@/components/SettingClubComponents/RemovePopup').then((mod) => mod.RemovePopup),
    {
        ssr: false,
    }
);

export function SettingClubPage({ baseClubInfo }: { baseClubInfo: ClubDetailDTO }) {
    const { grantRightsMutation, grantAdminRights } = useManageClub(baseClubInfo.id);

    const { data: clubAdmins, isLoading } = useQuery({
        queryKey: ['get-club-admins', baseClubInfo.id],
        queryFn: async () => (await clubsApi.clubsGetAdminsByClubId(baseClubInfo.id)).data,
    });

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
                {isLoading && <SkeletonList count={1} classNameSkeletonItem="h-[48px]" />}
                {clubAdmins?.map((admin) => (
                    <ManageUser user={admin} key={admin.id} clubId={baseClubInfo.id} />
                ))}
                <Button
                    variant={'default'}
                    isLoading={grantRightsMutation.isPending}
                    onClick={() => grantAdminRights(45)}
                >
                    <PlusIcon />
                    Добавить
                </Button>
            </MainContent>
            <RemovePopupDynamic clubId={baseClubInfo.id} />
        </Page>
    );
}
