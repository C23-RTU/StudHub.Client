import type { Metadata } from 'next';

import Profile from './Profile';
import { userApi } from '@/api/api';

export const metadata: Metadata = {
    title: 'Профиль',
    description: '',
};

export default async function Page() {
    const user = (await userApi.userGetPersonalDetails()).data;
    const userClubs = (await userApi.userGetSubscribedClubs()).data;

    return <Profile user={user} userClubs={userClubs} />;
}
