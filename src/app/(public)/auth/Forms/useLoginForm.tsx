import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { SubmitHandler, UseFormReset } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { EnumTokens, type TLoginDataSchema } from '@/lib/types/login.type';
import { AuthService } from '@/services/auth.service';

export const useLoginForm = (reset: UseFormReset<TLoginDataSchema>) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const { mutateAsync, isPending: isLoginPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: TLoginDataSchema) => await AuthService.login(data),
        onSuccess: ({ accessToken, refreshToken }) => {
            Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, { expires: 30 }); // 30 дней
            Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, { expires: 30 }); // 30 дней
        },
    });

    const submitHandler: SubmitHandler<TLoginDataSchema> = (data) => {
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

    const isLoading = isPending || isLoginPending;

    return {
        submitHandler,
        isLoading,
    };
};
