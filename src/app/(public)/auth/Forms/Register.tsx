'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { BirthDatePicker } from '@/components/ui/BirthDatePicker/BirthDatePicker';
import { FormField } from '@/components/ui/FormField/FormField';
import { FormTextArea } from '@/components/ui/FormTextArea/FormTextArea';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { instituteApi } from '@/api/api';
import type { InstituteDetailDTO } from '@/api/axios-client/models';

import { useRegisterForm } from './useRegisterForm';
import { RegisterDataSchema, type TRegisterDataSchema } from '@/lib/types/register.type';

export default function Register() {
    const [selectedInstitute, setSelectedInstitute] = useState<InstituteDetailDTO | null>(null);

    const { data: institutes } = useQuery({
        queryKey: ['fetch-institutes'],
        queryFn: async () => (await instituteApi.institutesGetAll()).data,
    });

    const {
        handleSubmit,
        reset,
        register,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<TRegisterDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(RegisterDataSchema),
    });

    const { submitHandler, isLoading } = useRegisterForm(reset, selectedInstitute);

    return (
        <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit(submitHandler)}>
            <div className="grid col-span-2 gap-4">
                <FormField
                    placeholder="Имя"
                    type="text"
                    autoComplete="off"
                    registration={register('firstName')}
                    error={errors.firstName?.message}
                />
                <FormField
                    placeholder="Фамилия"
                    type="text"
                    autoComplete="off"
                    registration={register('lastName')}
                    error={errors.lastName?.message}
                />
                <FormField
                    placeholder="Отчество"
                    type="text"
                    autoComplete="off"
                    registration={register('middleName')}
                    error={errors.middleName?.message}
                />
                <FormField
                    placeholder="Почта"
                    type="email"
                    autoComplete="off"
                    registration={register('email')}
                    error={errors.email?.message}
                />
            </div>
            <FormField
                placeholder="Пароль"
                type="password"
                autoComplete="off"
                registration={register('password')}
                error={errors.password?.message}
            />
            <FormField
                placeholder="Повторите пароль"
                type="password"
                autoComplete="off"
                registration={register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full bg-secondary border hover:bg-secondary/80 text-white border-neutral-700 truncate justify-start">
                        {selectedInstitute?.name || 'Выберите институт'}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-8 max-w-full">
                    <DropdownMenuLabel>Выберите институт</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setSelectedInstitute(null)}>—</DropdownMenuItem>
                    {institutes?.map((institute) => (
                        <DropdownMenuItem
                            title={institute.name}
                            key={institute.id}
                            onClick={() => setSelectedInstitute(institute)}
                        >
                            {institute.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <BirthDatePicker
                value={watch('birthDate') ? format(new Date(watch('birthDate')), 'yyyy-MM-dd') : undefined}
                onChange={(date) => {
                    if (date) {
                        setValue('birthDate', date, { shouldValidate: true });
                    }
                }}
                error={errors.birthDate?.message}
            />

            <div className="col-span-3">
                <FormTextArea placeholder="Расскажите о себе" registration={register('about')} />
            </div>

            <Button className="col-span-3" type="submit" isLoading={isLoading} disabled={!isValid}>
                Зарегистрироваться
            </Button>
        </form>
    );
}
