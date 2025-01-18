'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/button';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { AuthDataSchema, EnumTokens, type TAuthDataSchema } from '@/lib/types/auth.type';
import { AuthService } from '@/services/auth.service';

export default function Login() {
    const router = useRouter();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors, isValid },
    } = useForm<TAuthDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(AuthDataSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: TAuthDataSchema) => await AuthService.login(data),
        onSuccess: ({ accessToken, refreshToken }) => {
            Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, { expires: 1 / 24 / 6 }); // 10 минут
            Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, { expires: 30 }); // 30 дней

            router.push(AUTH_PAGE.HOME);

            reset();
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const onSubmitHandler: SubmitHandler<TAuthDataSchema> = (data) => {
        mutate(data);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitHandler)}>
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

            <Button type="submit" isLoading={isPending} disabled={!isValid}>
                Войти
            </Button>
        </form>
    );
}
