'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

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

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { RegisterDataSchema, type TRegisterDataSchema } from '@/lib/types/register.type';
import { AuthService } from '@/services/auth.service';

export default function Register() {
    const [selectedInstitute, setSelectedInstitute] = useState<{ id: number; name: string } | null>(null);

    const institutes = [
        { id: 1, name: 'ИКБ' },
        { id: 2, name: 'ИИИ' },
        { id: 3, name: 'ИПТИП' },
    ];

    const router = useRouter();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors, isValid },
    } = useForm<TRegisterDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(RegisterDataSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: async (data: TRegisterDataSchema) => await AuthService.register(data),
        onSuccess: () => {
            router.push(AUTH_PAGE.HOME);
            reset();
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const onSubmitHandler: SubmitHandler<TRegisterDataSchema> = (data) => {
        mutate(data);
    };

    return (
        <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit(onSubmitHandler)}>
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
            <div className="grid gap-4 grid-cols-2 col-span-2">
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
                        <Button className="w-full bg-secondary hover:bg-secondary/80 rounded-b-none border-b focus:border-b-2 focus:border-b-neutral-200 border-neutral-600">
                            {selectedInstitute?.name || 'Выберите институт'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Выберите институт</DropdownMenuLabel>
                        {institutes.map((institute) => (
                            <DropdownMenuItem key={institute.id} onClick={() => setSelectedInstitute(institute)}>
                                {institute.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <FormField
                    placeholder="Возраст"
                    type="date"
                    autoComplete="off"
                    registration={register('birthDate', { valueAsDate: true })}
                    error={errors.birthDate?.message}
                />
            </div>

            <div className="col-span-3">
                <FormTextArea placeholder="Расскажите о себе" registration={register('about')} />
            </div>

            <Button className="col-span-3" type="submit" isLoading={isPending} disabled={!isValid}>
                Зарегистрироваться
            </Button>
        </form>
    );
}
