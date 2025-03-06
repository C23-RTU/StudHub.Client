import {
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

interface CalendarProps {
    events?: { [key: string]: any[] };
    onDateChange: (date: Date) => void;
}

const EventCalendar = ({ events = {}, onDateChange }: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        onDateChange(selectedDate);
    }, [selectedDate, onDateChange]);

    const getDaysToRender = () => {
        if (isExpanded) {
            const monthStart = startOfMonth(currentDate);
            const monthEnd = endOfMonth(currentDate);
            return eachDayOfInterval({ start: monthStart, end: monthEnd });
        }

        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start: weekStart, end: weekEnd });
    };

    const handleDateClick = (day: Date) => {
        if (!isSameMonth(day, currentDate)) return;
        setSelectedDate(day);
    };

    const handleNavigation = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            if (isExpanded) {
                return direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1);
            }
            return direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1);
        });
    };

    const hasEvents = (day: Date) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        return events[dateKey]?.length > 0;
    };

    const days = getDaysToRender();

    return (
        <LayoutGroup>
            <motion.div
                className="w-full bg-secondary mx-auto p-4 rounded-lg max-w-[1024px]"
                layout
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center justify-between">
                    <motion.button
                        onClick={() => handleNavigation('prev')}
                        className="p-2 bg-primary hover:bg-primary/80 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft />
                    </motion.button>

                    <motion.h2
                        className="font-semibold"
                        key={format(currentDate, 'MM-yyyy')}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {format(currentDate, 'LLLL yyyy', { locale: ru })}
                    </motion.h2>

                    <motion.button
                        onClick={() => handleNavigation('next')}
                        className="p-2 bg-primary hover:bg-primary/80 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight />
                    </motion.button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 mt-4">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                <motion.div className="grid grid-cols-7 gap-1" layout transition={{ duration: 0.2 }}>
                    <AnimatePresence mode="popLayout">
                        {days.map((day) => {
                            const isCurrentMonth = isSameMonth(day, currentDate);
                            const isSelected = isSameDay(day, selectedDate);

                            return (
                                <motion.button
                                    key={day.toString()}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                      rounded-lg relative py-2
                      ${isSelected && 'bg-primary text-white hover:bg-primary'}
                      ${!isCurrentMonth ? 'text-gray-500' : 'hover:bg-primary/80'}
                    `}
                                    disabled={!isCurrentMonth}
                                    whileHover={isCurrentMonth ? { scale: 1.05 } : undefined}
                                    whileTap={isCurrentMonth ? { scale: 0.95 } : undefined}
                                >
                                    {format(day, 'd')}
                                    {hasEvents(day) && (
                                        <motion.div
                                            className="absolute bottom-1 left-1/2 -translate-x-1/2"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                        >
                                            <div className="w-1 h-1 bg-red-500 rounded-full" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <Button className="mt-4 w-full" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? 'Свернуть' : 'Развернуть'}
                </Button>
            </motion.div>
        </LayoutGroup>
    );
};

export default EventCalendar;
