'use client';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DatePickerProps = {
    value?: string;
    onChange: (date: string | undefined) => void;
    error?: string;
};

export function BirthDatePicker({ value, onChange, error }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [year, setYear] = useState<number>(value ? new Date(value).getFullYear() : new Date().getFullYear());
    const [month, setMonth] = useState<number>(value ? new Date(value).getMonth() : new Date().getMonth());

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = Number(event.target.value);
        setYear(newYear);
        const newDate = new Date(newYear, month, 1);
        onChange(format(newDate, 'yyyy-MM-dd'));
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = Number(event.target.value);
        setMonth(newMonth);
        const newDate = new Date(year, newMonth, 1);
        onChange(format(newDate, 'yyyy-MM-dd'));
    };

    const handleCalendarSelect = (date: Date | undefined) => {
        if (date) {
            onChange(format(date, 'yyyy-MM-dd'));
        } else {
            onChange(undefined);
        }
    };

    const currentMonth = new Date(year, month);

    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        className="bg-secondary hover:bg-secondary/80 w-full justify-start rounded-t-md border border-neutral-700 text-left transition duration-200"
                        onClick={() => setIsOpen(true)}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(new Date(value), 'PPP', { locale: ru }) : <span>Дата рождения</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="border-stroke bg-background mr-4 w-auto rounded-md p-0 shadow-md">
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div className="relative">
                                <select
                                    className="bg-secondary appearance-none rounded border pr-5 pl-2"
                                    value={year}
                                    onChange={handleYearChange}
                                >
                                    {Array.from({ length: 150 }, (_, i) => {
                                        const y = new Date().getFullYear() - 149 + i;
                                        if (y > new Date().getFullYear()) return null;
                                        return (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        );
                                    }).filter(Boolean)}
                                </select>
                                <ChevronsUpDown className="pointer-events-none absolute top-[50%] right-1 size-4 translate-y-[-50%]" />
                            </div>
                            <div className="relative">
                                <select
                                    className="bg-secondary appearance-none rounded border pr-5 pl-2"
                                    value={month}
                                    onChange={handleMonthChange}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {new Date(0, i).toLocaleString('ru', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                                <ChevronsUpDown className="pointer-events-none absolute top-[50%] right-1 size-4 translate-y-[-50%]" />
                            </div>
                        </div>
                        <Calendar
                            mode="single"
                            selected={value ? new Date(value) : undefined}
                            onSelect={handleCalendarSelect}
                            month={currentMonth}
                            showOutsideDays={false}
                            locale={ru}
                            hideNavigation
                        />
                        <div className="flex justify-center">
                            <button
                                className="bg-primary hover:bg-primary/80 w-full rounded-md py-2 text-center text-xs"
                                onClick={() => setIsOpen(false)}
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    );
}
