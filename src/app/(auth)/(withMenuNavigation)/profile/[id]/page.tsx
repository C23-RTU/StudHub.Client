import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { userApi, usersApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import Profile from './Profile';

export const metadata: Metadata = {
    title: 'Профиль',
    description: '',
};

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const user: PersonDetailDTO = (await usersApi.usersGetById(id)).data;
    const currentUser: PersonDetailDTO = (await userApi.userGetPersonalDetails()).data;

    if (currentUser.id === user.id) redirect(AUTH_PAGE.PROFILE);

    return <Profile user={user} />;
}
