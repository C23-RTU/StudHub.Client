import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { FaCalendar, FaCompass } from 'react-icons/fa';
import { IoAlertCircle, IoCopy } from 'react-icons/io5';

import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { eventsApi } from '@/api/api';

import EventNotFound from './EventNotFound';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { parseLocalTime } from '@/lib/utils/time.util';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const event = (await eventsApi.eventsGetById(Number(id))).data;

    if (!event) {
        return {
            title: 'Событие не найдено',
            description: 'Проверьте правильность ссылки на событие.',
        };
    }

    return {
        title: `Событие "${event.title}"`,
        description: event.description,
    };
}

export const revalidate = 100;

export default async function EventViewPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const event = (await eventsApi.eventsGetById(Number(id))).data;
    if (!event) {
        return <EventNotFound />;
    }

    return (
        <Page>
            <div className="fixed z-20 flex w-full max-w-[600px] flex-row items-center justify-between bg-gradient-to-b from-black/70 to-black/0 p-4">
                <div className="flex flex-row items-center">
                    <BackButton variant={'outline'} className="size-10" />
                    {/* <p className="bg-secondary font-geologica ml-4 h-10 rounded-lg px-3 py-1 text-lg leading-8 font-medium shadow-[rgba(0,0,0,0.24)_0px_3px_8px] hover:cursor-pointer"> */}
                    {/*     Подробности */}
                    {/* </p> */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-10 w-10">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={async () => {
                                navigator.clipboard.writeText(window.location.href);
                                const { toast } = await import('react-hot-toast');
                                toast.success('Ссылка скопирована');
                            }}
                        >
                            <IoCopy className="text-text" />
                            Скопировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                            <IoAlertCircle className="text-red-400" />
                            Пожаловаться
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border-border relative flex h-[300px] w-full border-b">
                <Image
                    src={
                        (event.eventImages.length > 0 && getStaticImg(event.eventImages[0])) ||
                        '/img/default-club-banner.jpg'
                    }
                    fill
                    alt={event.title || 'Event banner'}
                    className="object-cover"
                    priority
                />
                <div className="container mx-auto">
                    <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-3 px-4 pb-4"></div>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-[20px]">
                <h1 className="font-geologica text-3xl font-semibold">{event.title}</h1>
                <p className="text-neutral-300">{event.description}</p>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-3">
                        <FaCompass className="h-4 w-4" />
                        <p>{event.location}</p>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <FaCalendar className="h-4 w-4" />
                        <time>{parseLocalTime(event.startTime)}</time>
                    </div>
                </div>
            </div>
        </Page>
    );
}
