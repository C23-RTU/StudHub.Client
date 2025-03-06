'use client';

import EventCalendar from '@/components/EventCalendar/EventCalendar';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import { useState } from 'react';

export function Calendar() {
    const [events] = useState({
        '2024-03-15': [{}],
        '2024-03-20': [{}, {}],
    });

    const handleDateChange = (date: Date) => {
        console.log('Selected date:', date);
    };

    return (
        <div className="page">
            <Header>
                <HeaderTitle>Календарь событий</HeaderTitle>
            </Header>
            <MainContent>
                <EventCalendar events={events} onDateChange={handleDateChange} />
                
            </MainContent>
        </div>
    );
}
