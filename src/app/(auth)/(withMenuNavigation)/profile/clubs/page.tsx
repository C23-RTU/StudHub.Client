import type { Metadata } from 'next';

import ProfileClubs from './ProfileClubs';

export const metadata: Metadata = {
    title: 'Подписки',
    description: '',
};

export default async function Page() {
    return <ProfileClubs />;
}
