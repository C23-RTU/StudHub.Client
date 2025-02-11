import Link from 'next/link';

// import { SubscriberCard } from '@/components/SubscriberCard/SubscriberCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { HeaderTitle } from '@/hoc/Header/Header';

export function Subscribers({ id }: { id: string }) {
    return (
        <div className="page">
            <div className="sticky top-1 left-0 flex items-center mb-4 gap-5">
                <Link href={`/clubs/${id}`}>
                    <BackButton />
                </Link>
                <HeaderTitle>Подписчики</HeaderTitle>
            </div>
            <div className="space-y-4">
                {/* {subscribers.map((subscriber, index) => (
                    <SubscriberCard
                        key={index}
                        username={`${subscriber.firstName} ${subscriber.middleName} ${subscriber.lastName}`}
                        avatar={subscriber.imagePath || '/img/avatar.png'}
                        role={'Не указано'}
                    />
                ))} */}
            </div>
        </div>
    );
}
