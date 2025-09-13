import type { Metadata } from 'next';

import { usersApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import Profile from './Profile';
import { getPersonIdFromToken } from '@/server-actions/actions/getPersonIdFromToken.action';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Профиль',
    description: 'Профиль пользователя',
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const user: PersonDetailDTO = (await usersApi.usersGetById(id)).data;

    let currentPerson = await getPersonIdFromToken();
    if (!currentPerson) {
        console.log('Не удалось получить текущего пользователя из токена');
        currentPerson = '0';
    }

    const isCurrent = user.id === Number(currentPerson);

    return <Profile user={user} isCurrent={isCurrent} />;
}
