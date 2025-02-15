import type { Metadata } from 'next';

import { userApi } from '@/api/api';

import Home from './Home';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export default async function HomePage() {
    let username = 'Инопланетянин';

    try {
        username = (await userApi.userGetName()).data;
    } catch {}

    return <Home username={username} />;
}
