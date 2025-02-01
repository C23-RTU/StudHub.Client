import EventNotFound from './EventNotFound';
import EventView from './EventView';
import { EventsService } from '@/services/events.service';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const event = await EventsService.getById(id);

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

    const event = await EventsService.getById(id);
    return event ? <EventView event={event} /> : <EventNotFound />;
}
