import type { Metadata } from 'next';

import { userApi } from '@/api/api';
import type { ClubDetailDTO } from '@/api/axios-client';

import ProfileClubs from './ProfileClubs';

export const metadata: Metadata = {
    title: 'Подписки',
    description: '',
};

export default async function Page() {
    const clubs: ClubDetailDTO[] = (await userApi.userGetSubscribedClubs()).data;

    return <ProfileClubs clubs={clubs} />;
}
