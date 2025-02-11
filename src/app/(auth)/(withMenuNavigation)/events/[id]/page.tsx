import { eventsApi } from '@/api/api';

import EventNotFound from './EventNotFound';
import EventView from './EventView';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const event = (await eventsApi.eventsGetById(Number(id))).data;

    if (!event) {
        return {
            title: 'Событие не найдено',
            description: '',
        };
    }

    return {
        title: `${event.title} - Событие`,
        description: event.description,
    };
}

export const revalidate = 100;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const event = (await eventsApi.eventsGetById(Number(id))).data;
    return event ? <EventView event={event} /> : <EventNotFound />;
}
