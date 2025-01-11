import type { Metadata } from 'next';

import Home from './Home';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};
export default async function HomePage() {
    return <Home />;
}
