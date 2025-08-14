'use client';

import { useRouter } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { EventDetailDTO } from '@/api/axios-client';

import LoaderImage from '../ImageLoader/ImageLoader';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { parseLocalTime } from '@/lib/utils/time.util';

export function EventCard({ event }: { event: EventDetailDTO }) {
    const router = useRouter();

    return (
        <figure
            className="group relative flex h-[220px] w-full cursor-pointer overflow-hidden"
            onClick={() => router.push(AUTH_PAGE.EVENT(event.id))}
        >
            <LoaderImage
                src={
                    (event.eventImages.length > 0 && getStaticImg(event.eventImages[0])) ||
                    '/img/default-club-banner.jpg'
                }
                alt={`Event: ${event.title}`}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-1 p-4">
                <time className="font-inter text-sm text-gray-200">{parseLocalTime(event.startTime)}</time>
                <h3 className="font-geologica line-clamp-2 text-2xl font-semibold text-white">{event.title}</h3>
                <p className="font-inter line-clamp-2 text-sm text-gray-200">{event.description}</p>
            </div>
        </figure>
    );
}
