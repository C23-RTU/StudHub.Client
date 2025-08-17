'use client';

import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { m } from 'framer-motion';
import { useMemo, useState } from 'react';

import EventCalendar from '@/components/EventCalendar/EventCalendar';
import { EventCard } from '@/components/EventCard/EventCard';
import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { eventsApi } from '@/api/api';
import type { EventDetailDTO } from '@/api/axios-client';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { toUTCDate } from '@/lib/utils/time.util';

export function Calendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: allEvents } = useQuery({
        queryKey: ['fetch-all-events-calendar'],
        queryFn: async () => (await eventsApi.eventsGetAll()).data,
    });

    const calendarEvents = useMemo(() => {
        return allEvents?.reduce(
            (acc, event) => {
                const date = parseISO(event.startTime);
                const utcDate = toUTCDate(date);
                const dateKey = format(utcDate, 'yyyy-MM-dd');
                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(event);
                return acc;
            },
            {} as { [key: string]: EventDetailDTO[] }
        );
    }, [allEvents]);

    const {
        ref,
        infiniteQuery: { data: eventsPages, isLoading },
    } = useInfinityScroll({
        queryKey: ['fetch-events-calendar', selectedDate.toISOString()], // eslint-disable-line @tanstack/query/exhaustive-deps
        queryFn: async ({ pageParam = 0 }) => {
            const utcDate = toUTCDate(selectedDate);
            return (await eventsApi.eventsGetByDate(utcDate.toISOString(), pageParam, 10)).data;
        },
        pageSize: 10,
    });

    const hasEvents = useMemo(() => {
        return eventsPages?.pages.some((page) => page.length > 0);
    }, [eventsPages]);

    return (
        <Page>
            <Header className="justify-start gap-4">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Календарь событий</HeaderTitle>
            </Header>
            <MainContent className="gap-0">
                <EventCalendar events={calendarEvents || {}} onDateChange={(date) => setSelectedDate(date)} />

                <div className="flex flex-col gap-4">
                    {hasEvents
                        ? eventsPages?.pages
                              .flatMap((page) => page)
                              .map((event, index) => (
                                  <m.div
                                      key={event.id}
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="border-border border-b"
                                  >
                                      <EventCard event={event} />
                                  </m.div>
                              ))
                        : !isLoading && (
                              <div className="flex w-full items-center justify-center py-4 text-neutral-500">
                                  В выбранный день событий нет
                              </div>
                          )}
                </div>
                <div ref={ref}></div>
            </MainContent>
        </Page>
    );
}
