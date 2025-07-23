import type { Metadata } from 'next';

import ProfileClubs from './ProfileClubs';

export const metadata: Metadata = {
    title: 'Ваши подписки',
    description: '',
};

export default function Page() {
    return <ProfileClubs />;
}
