'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/button';

import { useLoginForm } from './useLoginForm';
import { LoginDataSchema, type TLoginDataSchema } from '@/lib/types/login.type';

export default function Login() {
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors, isValid },
    } = useForm<TLoginDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(LoginDataSchema),
    });

    const { submitHandler, isLoading } = useLoginForm(reset);

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
            <FormField
                placeholder="Email"
                type="email"
                autoComplete="off"
                registration={register('email')}
                error={errors.email?.message}
            />
            <FormField
                placeholder="Пароль"
                type="password"
                registration={register('password')}
                error={errors.password?.message}
            />

            <Button type="submit" isLoading={isLoading} disabled={!isValid}>
                Войти
            </Button>
        </form>
    );
}
