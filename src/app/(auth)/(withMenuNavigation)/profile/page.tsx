import type { Metadata } from 'next';

import Profile from './UserProfile';

export const metadata: Metadata = {
    title: 'Ваш профиль',
    description: '',
};

export default async function Page() {
    return <Profile />;
}
