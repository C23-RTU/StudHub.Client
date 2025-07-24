import type { Metadata } from 'next';

import ProfileClubs from './UserProfileClubs';

export const metadata: Metadata = {
    title: 'Ваши подписки',
    description: '',
};

export default function Page() {
    return <ProfileClubs />;
}
