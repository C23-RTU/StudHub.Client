'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { BiExit } from 'react-icons/bi';

import { MenuItem } from '@/components/ui/menu';

import { PUBLIC_PAGE } from '@/lib/config/routes.config';

import { authApi } from '@/api/api';

export default function MenuLogoutItem() {
    const router = useRouter();

    const { mutateAsync } = useMutation({
        mutationKey: ['logout-profile'],
        mutationFn: async () => await authApi.authLogout(),
    });

    const logoutHandler = async () => {
        const { toast } = await import('react-hot-toast');
        toast.promise(
            mutateAsync(),
            {
                loading: 'Выход из системы',
                success: () => {
                    startTransition(() => {
                        router.push(PUBLIC_PAGE.AUTH('login'));
                    });

                    return 'Успешно!';
                },
                error: () => {
                    return 'Ошибка при попытке выхода из профиля';
                },
            },
            {
                id: 'error',
            }
        );
    };
    return <MenuItem title={'Выйти из аккаунта'} Icon={BiExit} onClick={logoutHandler} hideChevron />;
}
