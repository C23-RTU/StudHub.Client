import type { Metadata } from 'next';

import Home from './Home';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export default async function HomePage() {
    const getTimeBasedGreeting = (): string => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return 'Доброе утро';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Добрый день';
        } else if (currentHour >= 18 && currentHour < 23) {
            return 'Добрый вечер';
        }

        return 'Доброй ночи';
    };

    return <Home timeBasedGreeting={getTimeBasedGreeting()} />;
}
