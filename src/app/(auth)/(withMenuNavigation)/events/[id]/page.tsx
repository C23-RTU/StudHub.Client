import EventView from './EventView';
import { events } from '@/data/events';
import type { ClubEvent } from '@/lib/types/event';
import EventNotFound from './EventNotFound';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const event: ClubEvent | undefined = events.find((e) => e.id === +id);

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
    const event: ClubEvent | undefined = events.find((e) => e.id === +id);
    return event ? <EventView event={event} /> : <EventNotFound />;
}