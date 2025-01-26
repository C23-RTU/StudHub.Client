import Link from 'next/link';

import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { HeaderTitle } from '@/hoc/Header/Header';
import type { User } from '@/lib/types/post';

export function Subscribers({ id }: { id: string }) {
    const subscribers: User[] = [
        {
            id: 1,
            status: 'online',
            name: 'Станислав Алексеевич Кудж',
            avatarUrl: '/img/avatar.png',
            major: 'Ректор РТУ МИРЭА',
        },
        {
            id: 2,
            status: 'offline',
            name: 'Иван Иванов',
            avatarUrl: '/img/avatar.png',
            major: 'Студент',
        },
    ];

    return (
        <div className="page">
            <div className="sticky top-1 left-0 flex items-center mb-4 gap-5">
                <Link href={`/clubs/${id}`}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </div>
            <div className="space-y-4">
                {subscribers.map((subscriber, index) => (
                    <SubscriberCard
                        key={index}
                        status={subscriber.status as 'online' | 'offline'}
                        name={subscriber.name}
                        avatar={subscriber.avatarUrl || '/img/avatar.png'}
                        role={subscriber.major || 'Не указано'}
                    />
                ))}
            </div>
        </div>
    );
}
