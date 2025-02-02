import type { Metadata } from 'next';

import { Events } from './Events';
import { EventsService } from '@/services/events.service';

export const metadata: Metadata = {
    title: 'События',
    description: '',
};

export default async function Page() {
    const events = await EventsService.getEvents();

    return <Events events={events} />;
}
