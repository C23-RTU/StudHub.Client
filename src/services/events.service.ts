import { api } from '@/api/api';

import type { IClubEvent } from '@/lib/types/event.type';

class eventsService {
    private _events = '/events';

    async getEvents(): Promise<IClubEvent[]> {
        return (await api.get(`${this._events}`)).data;
    }

    async getById(eventId: number | string): Promise<IClubEvent | null> {
        try {
            return (await api.get(`${this._events}/${eventId}`)).data;
        } catch {
            return null;
        }
    }
}

export const EventsService = new eventsService();
