import type { Metadata } from 'next';

import Profile from './Profile';
import type { PersonDetailDTO } from '@/api/axios-client';
import { userApi } from '@/api/api';

export const metadata: Metadata = {
    title: 'Профиль',
    description: '',
};

export default async function Page() {
    const user: PersonDetailDTO = (await userApi.userGetPersonalDetails()).data;
    return <Profile user={user} />;
}
