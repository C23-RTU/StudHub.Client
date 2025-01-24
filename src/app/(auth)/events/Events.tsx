import { EventCard } from '@/components/EventCard/EventCard';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import type { ClubEvent } from '@/lib/types/event';

export function Events({ events }: { events: ClubEvent[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>События</HeaderTitle>
            </Header>
            <div className='flex flex-col gap-6'>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
