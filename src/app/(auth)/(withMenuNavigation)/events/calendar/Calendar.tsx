'use client';

import { useQuery } from '@tanstack/react-query';
import { format, parseISO, startOfDay } from 'date-fns';
import { useState } from 'react';

import EventCalendar from '@/components/EventCalendar/EventCalendar';
import { EventCard } from '@/components/EventCard/EventCard';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { eventsApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: allEvents } = useQuery({
        queryKey: ['fetch-all-events-calendar'],
        queryFn: async () => (await eventsApi.eventsGetAll()).data,
    });

    const {
        ref,
        infiniteQuery: { data: eventsPages, isLoading },
    } = useInfinityScroll({
        queryKey: ['fetch-events-calendar', selectedDate.toISOString()],
        queryFn: async ({ pageParam = 0 }) => {
            return (await eventsApi.eventsGetByDate(selectedDate.toISOString(), pageParam, 10)).data;
        },
        pageSize: 10,
    });

    const calendarEvents = allEvents?.reduce(
        (acc, event) => {
            const date = startOfDay(parseISO(event.startTime));
            const dateKey = format(date, 'yyyy-MM-dd');
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(event);
            return acc;
        },
        {} as { [key: string]: any[] }
    );

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Календарь событий</HeaderTitle>
            </Header>
            <MainContent>
                <EventCalendar events={calendarEvents || {}} onDateChange={handleDateChange} />

                <div ref={ref} className="grid grid-cols-1 gap-4 mt-8">
                    {eventsPages?.pages
                        .flatMap((page) => page)
                        .map((event, index) => {
                            return <EventCard key={index} event={event} />;
                        })}
                </div>
            </MainContent>
        </div>
    );
}
