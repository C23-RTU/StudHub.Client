'use client';

import {
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight, Expand, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { EventDetailDTO } from '@/api/axios-client';

import { Button } from '../ui/button';

interface CalendarProps {
    events?: { [key: string]: EventDetailDTO[] };
    onDateChange: (date: Date) => void;
}

const EventCalendar = ({ events = {}, onDateChange }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);

    // Utility function to convert to UTC (simplified version)
    const toUTCDate = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    useEffect(() => {
        onDateChange(selectedDate);
    }, [selectedDate, onDateChange]);

    const getDaysToRender = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);

        if (isExpanded) {
            const start = startOfWeek(monthStart, { weekStartsOn: 1 });
            const end = endOfWeek(monthEnd, { weekStartsOn: 1 });
            return eachDayOfInterval({ start, end });
        }

        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start: weekStart, end: weekEnd });
    };

    const handleDateClick = (day: Date) => {
        const utcDay = toUTCDate(day);
        if (!isSameMonth(utcDay, toUTCDate(currentDate))) return;
        setSelectedDate(utcDay);
    };

    const handleNavigation = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            if (isExpanded) {
                return direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1);
            }
            return direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1);
        });
    };

    const getEventCount = (day: Date) => {
        const utcDay = toUTCDate(day);
        const dateKey = format(utcDay, 'yyyy-MM-dd');
        return events[dateKey]?.length || 0;
    };

    const days = getDaysToRender();

    return (
        <div className="border-border mx-auto w-full max-w-[600px] overflow-hidden border-b">
            {/* Header */}
            <div className="px-3 pt-[20px]">
                <div className="mb-4 flex items-center gap-4">
                    <Button variant={'ghost'} onClick={() => handleNavigation('prev')}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="w-full text-center">
                        <h2 className="text-lg font-bold sm:text-xl">
                            {format(currentDate, 'LLLL yyyy', { locale: ru })}
                        </h2>
                        <div className="mt-1 flex items-center justify-center gap-2 opacity-90">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{isExpanded ? 'Месяц' : 'Неделя'}</span>
                        </div>
                    </div>

                    <Button variant={'ghost'} onClick={() => handleNavigation('next')}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Button variant={'ghost'} onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? (
                            <>
                                <Minimize className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <Expand className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                        <div
                            key={day}
                            className={`py-2 text-center text-xs font-medium sm:text-sm ${index >= 5 ? 'text-orange-700' : 'text-black/90'}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-3 sm:p-4">
                <div className="mb-4 grid grid-cols-7 gap-1 sm:gap-2">
                    {days.map((day, index) => {
                        const utcDay = toUTCDate(day);
                        const isCurrentMonth = isSameMonth(utcDay, toUTCDate(currentDate));
                        const isSelected = isSameDay(utcDay, toUTCDate(selectedDate));
                        const isDayToday = isToday(utcDay);
                        const eventCount = getEventCount(day);
                        const isWeekend = index % 7 >= 5;

                        return (
                            <button
                                key={day.toString()}
                                onClick={() => handleDateClick(day)}
                                disabled={!isCurrentMonth}
                                className={`relative aspect-square rounded-xl text-sm font-medium transition-all duration-200 sm:text-base ${isCurrentMonth ? 'hover:scale-105 active:scale-95' : 'cursor-not-allowed opacity-30'} ${
                                    isSelected
                                        ? 'bg-primary scale-105 text-white shadow-lg'
                                        : isDayToday
                                          ? 'border-primary bg-primary/20 text-primary hover:bg-primary/60 border-2'
                                          : isCurrentMonth
                                            ? `${isWeekend ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`
                                            : 'text-gray-300'
                                } `}
                            >
                                <span className="block">{format(day, 'd')}</span>

                                {/* Event indicators */}
                                {eventCount > 0 && isCurrentMonth && (
                                    <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 transform gap-0.5">
                                        {eventCount === 1 && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        )}
                                        {eventCount === 2 && (
                                            <>
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                            </>
                                        )}
                                        {eventCount >= 3 && (
                                            <>
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Event count badge for many events */}
                                {eventCount > 3 && isCurrentMonth && (
                                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {eventCount}
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Toggle view button */}
            </div>
        </div>
    );
};

export default EventCalendar;
