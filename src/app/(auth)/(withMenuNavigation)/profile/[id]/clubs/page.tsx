import type { Metadata } from 'next';

import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';

import { usersApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import ProfileClubs from './ProfileClubs';
import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export const metadata: Metadata = {
    title: 'Подписки',
    description: 'Подписки пользователя',
};

export default async function ClubsPage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const user: PersonDetailDTO = (await usersApi.usersGetById(id)).data;

    return (
        <Page>
            <Header className="justify-start gap-4">
                <BackButton variant={'ghost'} />
                <HeaderTitle>
                    {user.firstName} {user.lastName}: подписки
                </HeaderTitle>
            </Header>
            <MainContent>
                <ProfileClubs user={user} />
            </MainContent>
        </Page>
    );
}
