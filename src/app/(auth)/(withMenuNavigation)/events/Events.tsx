import { EventCard } from '@/components/EventCard/EventCard';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import type { IClubEvent } from '@/lib/types/event.type';

export function Events({ events }: { events: IClubEvent[] }) {
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
