import type { Metadata } from 'next';

import { usersApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import Profile from './Profile';

export const metadata: Metadata = {
    title: `Профиль пользователя {user}`,
    description: '',
};

export default async function Page({ params }: { params: { id: number } }) {
    const { id } = await params;
    const user: PersonDetailDTO = (await usersApi.usersGetById(id)).data;

    return <Profile user={user} />;
}
