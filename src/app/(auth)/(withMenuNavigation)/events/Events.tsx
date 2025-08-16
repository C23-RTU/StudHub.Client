'use client';

import { m } from 'framer-motion';
import { CalendarClock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { EventCard } from '@/components/EventCard/EventCard';
import { Page } from '@/components/Page';
import { Button } from '@/components/ui/button';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { EventDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Events({ events }: { events: EventDetailDTO[] }) {
    const router = useRouter();

    return (
        <Page>
            <Header className="justify-between py-[14px]">
                <HeaderTitle>События</HeaderTitle>
                <Button size={'icon'} onClick={() => router.push(AUTH_PAGE.EVENTS_CALENDAR())}>
                    <CalendarClock size={35} />
                </Button>
            </Header>
            <MainContent className="flex flex-col gap-0">
                {events &&
                    events.map((event, index) => (
                        <m.div
                            key={event.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                            className="border-border border-b"
                        >
                            <EventCard event={event} />
                        </m.div>
                    ))}
            </MainContent>
        </Page>
    );
}
