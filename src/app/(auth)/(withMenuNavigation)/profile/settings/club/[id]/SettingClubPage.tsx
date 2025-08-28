'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { ManageUser } from '@/components/ManageUser/ManageUser';
import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { clubsApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function SettingClubPage({ baseClubInfo }: { baseClubInfo: ClubDetailDTO }) {
    const { data: clubAdmins } = useQuery({
        queryKey: ['get-club-admins', baseClubInfo.id],
        queryFn: async () => (await clubsApi.clubsGetAdminsByClubId(baseClubInfo.id)).data,
    });

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['test'],
        mutationFn: async () => await clubsApi.clubsGrantAdminRights(45, baseClubInfo.id),
    });
    return (
        <Page>
            <Header className="">
                <BackButton variant={'ghost'} />
                <HeaderTitle>
                    <Link href={AUTH_PAGE.CLUB(baseClubInfo.id)}>{baseClubInfo.name}</Link>
                </HeaderTitle>
            </Header>

            <MainContent className="px-pageX py-pageY">
                <h3 className="font-geologica flex gap-2 text-lg font-semibold">
                    Администраторы клуба
                    <span className="bg-secondary rounded px-2 py-1 text-sm text-white">{clubAdmins?.length}</span>
                </h3>
                {clubAdmins?.map((admin) => (
                    <ManageUser user={admin} key={admin.id} />
                ))}
                <Button variant={'default'} isLoading={isPending} onClick={async () => await mutateAsync()}>
                    <PlusIcon />
                    Добавить
                </Button>
            </MainContent>
        </Page>
    );
}
