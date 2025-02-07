import type { Metadata } from 'next';

import { eventsApi } from '@/api/api';

import { Events } from './Events';

export const metadata: Metadata = {
    title: 'События',
    description: '',
};

export default async function Page() {
    const events = (await eventsApi.eventsGetAll()).data;

    return <Events events={events} />;
}
