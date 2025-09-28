import type { Metadata } from 'next';
import Link from 'next/link';

import { CalendarBadge } from '@/components/Badges';
import { EventCard } from '@/components/EventCard/EventCard';
import { Page } from '@/components/Page';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { eventsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export const metadata: Metadata = {
    title: 'События',
    description: '',
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function EventsPage() {
    const events = (await eventsApi.eventsGetAll()).data;

    return (
        <Page>
            <Header className="justify-between py-[14px] pr-[12px]">
                <HeaderTitle>События</HeaderTitle>
                <Link href={AUTH_PAGE.EVENTS_CALENDAR()}>
                    <CalendarBadge />
                </Link>
            </Header>
            <MainContent className="flex flex-col gap-0">
                {events &&
                    events.map((event) => (
                        <div key={event.id} className="border-border border-b">
                            <EventCard event={event} />
                        </div>
                    ))}
            </MainContent>
        </Page>
    );
}
