'use client';

import { m } from 'framer-motion';

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
            <MainContent>
                {events &&
                    events.map((event, index) => (
                        <m.div
                            key={event.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <EventCard event={event} />
                        </m.div>
                    ))}
            </MainContent>
        </div>
    );
}
