import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { HeaderTitle } from '@/hoc/Header/Header';
import Link from 'next/link';

export function Subscribers({ id }: { id: string }) {
    const subscribers = [
        {
            status: 'online' as 'online',
            name: 'Станислав Алексеевич Кудж',
            avatar: '/img/avatar.png',
            role: 'Ректор РТУ МИРЭА',
        },
        {
            status: 'offline' as 'offline',
            name: 'Иван Иванов',
            avatar: '/img/avatar.png',
            role: 'Студент',
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
                        status={subscriber.status}
                        name={subscriber.name}
                        avatar={subscriber.avatar}
                        role={subscriber.role}
                    />
                ))}
            </div>
        </div>
    );
}
