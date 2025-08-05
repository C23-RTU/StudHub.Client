import type { Metadata } from 'next';

import { userApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

import Settings from './Settings';

export const metadata: Metadata = {
    title: 'Настройки профиля',
    description: '',
};

export default async function Page() {
    const user: PersonDetailDTO = (await userApi.userGetPersonalDetails()).data;
    return <Settings initUser={user} />;
}
