import { EventCard } from '@/components/EventCard/EventCard';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import type { ClubEvent } from '@/lib/types/event';

export function Events({ events }: { events: ClubEvent[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>События</HeaderTitle>
            </Header>
            <MainContent>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </MainContent>
        </div>
    );
}
