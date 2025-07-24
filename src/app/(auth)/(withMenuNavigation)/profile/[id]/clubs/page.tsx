import type { Metadata } from 'next';

import { usersApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import ProfileClubs from './ProfileClubs';

export const metadata: Metadata = {
    title: 'Подписки',
    description: '',
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const user: PersonDetailDTO = (await usersApi.usersGetById(id)).data;

    return <ProfileClubs user={user} />;
}
