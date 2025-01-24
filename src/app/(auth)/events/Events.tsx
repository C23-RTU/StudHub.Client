import { EventCard } from '@/components/EventCard/EventCard';
import ListView from '@/components/ListView/ListView';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import type { ClubEvent } from '@/lib/types/event';

export function Events({ events }: { events: ClubEvent[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>События</HeaderTitle>
            </Header>
            <ListView>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ListView>
        </div>
    );
}
