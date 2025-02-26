import type { Metadata } from 'next';

import Profile from './Profile';
import { userApi } from '@/api/api';
import type { ClubDetailDTO, PersonDetailDTO } from '@/api/axios-client';

export const metadata: Metadata = {
    title: 'Профиль',
    description: '',
};

export default async function Page() {
    const user: PersonDetailDTO = (await userApi.userGetPersonalDetails()).data;
    const userClubs: ClubDetailDTO[] = (await userApi.userGetSubscribedClubs()).data;

    return <Profile user={user} userClubs={userClubs} />;
}
