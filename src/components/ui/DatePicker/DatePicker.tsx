'use client';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DatePickerProps = {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    error?: string;
};

export function DatePicker({ value, onChange, error }: DatePickerProps) {
    const [year, setYear] = React.useState<number>(value?.getFullYear() || new Date().getFullYear());
    const [month, setMonth] = React.useState<number>(value?.getMonth() || new Date().getMonth());

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(event.target.value));
        const newDate = new Date(Number(event.target.value), month, value?.getDate() || 1);
        onChange(newDate);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(event.target.value));
        const newDate = new Date(year, Number(event.target.value), value?.getDate() || 1);
        onChange(newDate);
    };

    const currentMonth = new Date(year, month);

    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="w-full justify-start text-left rounded-t-md bg-secondary hover:bg-secondary/80 rounded-b-none border-b transition duration-300 focus:border-b-2 focus:border-b-neutral-200 border-neutral-600">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, 'PPP', { locale: ru }) : <span>Дата рождения</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-md">
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div className="relative">
                                <select
                                    className="appearance-none border pl-2 pr-4 rounded bg-secondary"
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
                                <ChevronsUpDown className="absolute size-4 right-1 top-[50%] translate-y-[-50%] pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none border pl-2 pr-4 rounded bg-secondary"
                                    value={month}
                                    onChange={handleMonthChange}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>
                                            {new Date(0, i).toLocaleString('ru', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                                <ChevronsUpDown className="absolute size-4 right-1 top-[50%] translate-y-[-50%] pointer-events-none" />
                            </div>
                        </div>
                        <Calendar
                            mode="single"
                            selected={value}
                            onSelect={onChange}
                            month={currentMonth}
                            initialFocus
                            locale={ru}
                        />
                    </div>
                </PopoverContent>
            </Popover>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
