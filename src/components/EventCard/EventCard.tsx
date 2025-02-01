'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { IClubEvent } from '@/lib/types/event.type';
import { parseLocalTime } from '@/lib/utils/time.util';

export function EventCard({ event }: { event: IClubEvent }) {
    const router = useRouter();
    return (
        <figure
            className="flex relative w-full rounded-2xl h-[220px] group overflow-hidden"
            onClick={() => router.push(AUTH_PAGE.EVENT(event.id))}
        >
            <Image
                src={event.eventImages.length > 0 ? event.eventImages[0] : '/img/eventbanner.jpg'}
                alt={`Event: ${event.title}`}
                fill
                priority
                className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-2xl"></div>
            <div className="flex absolute z-10 flex-col items-start p-4 h-full w-full justify-end gap-1">
                <time className="text-sm text-gray-200 font-inter">{parseLocalTime(event.startTime)}</time>
                <h3 className="font-geologica text-2xl font-semibold text-white line-clamp-2">{event.title}</h3>
                <p className="font-inter text-sm text-gray-200 line-clamp-2">{event.description}</p>
            </div>
        </figure>
    );
}
