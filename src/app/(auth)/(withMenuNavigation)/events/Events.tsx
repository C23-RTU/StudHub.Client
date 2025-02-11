import { EventCard } from '@/components/EventCard/EventCard';

import type { EventDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Events({ events }: { events: EventDetailDTO[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>События</HeaderTitle>
            </Header>
            <MainContent>{events && events.map((event) => <EventCard key={event.id} event={event} />)}</MainContent>
        </div>
    );
}
