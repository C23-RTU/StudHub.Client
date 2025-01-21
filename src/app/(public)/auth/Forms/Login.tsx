'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormField } from '@/components/ui/FormField/FormField';
import { Button } from '@/components/ui/button';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { EnumTokens, LoginDataSchema, type TLoginDataSchema } from '@/lib/types/login.type';
import { AuthService } from '@/services/auth.service';

export default function Login() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors, isValid },
    } = useForm<TLoginDataSchema>({
        mode: 'onChange',
        resolver: zodResolver(LoginDataSchema),
    });

    //TODO: вынести в отдельный хук useLogin.tsx
    const { mutateAsync, isPending: isLoginPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: TLoginDataSchema) => await AuthService.login(data),
        onSuccess: ({ accessToken, refreshToken }) => {
            Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, { expires: 30 }); // 30 дней
            Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, { expires: 30 }); // 30 дней
        },
    });

    const onSubmitHandler: SubmitHandler<TLoginDataSchema> = (data) => {
        toast.promise(
            mutateAsync(data),
            {
                loading: 'Попытка входа...',
                success: () => {
                    startTransition(() => {
                        reset();
                        router.push(AUTH_PAGE.HOME);
                    });

                    return 'Успешный вход!';
                },
                error: (error: unknown) => {
                    console.log(error);
                    if (axios.isAxiosError(error)) {
                        return error.response?.data.detail;
                    }
                },
            },
            {
                id: 'error',
            },
        );
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

            <Button type="submit" isLoading={isPending || isLoginPending} disabled={!isValid}>
                Войти
            </Button>
        </form>
    );
}
