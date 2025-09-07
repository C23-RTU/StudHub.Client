import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { clubsApi } from '@/api/api';

export const useManageClub = (clubId: number) => {
    const queryClient = useQueryClient();

    const grantRightsMutation = useMutation({
        mutationKey: ['grant-admin-rights'],
        mutationFn: async (userId: number) => await clubsApi.clubsGrantAdminRights(userId, clubId),
    });

    const revokeRightsMutation = useMutation({
        mutationKey: ['revoke-admin-rights'],
        mutationFn: async (userId: number) => await clubsApi.clubsRevokeAdminRights(userId, clubId),
    });

    const grantAdminRights = async (userId: number) => {
        await grantRightsMutation.mutateAsync(userId, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-club-admins'] }),
            onError: async (error) => {
                const { toast } = await import('react-hot-toast');
                let msg = 'Ошибка при добавлении';
                if (isAxiosError(error)) {
                    msg = error.response?.data.detail;
                }
                toast.error(msg, {
                    position: 'top-center',
                });
            },
        });
    };

    const revokeAdminRights = async (userId: number) => {
        await revokeRightsMutation.mutateAsync(userId, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-club-admins'] }),
            onError: async (error) => {
                const { toast } = await import('react-hot-toast');
                let msg = 'Ошибка при удалении';
                if (isAxiosError(error)) {
                    msg = error.response?.data.detail;
                }
                toast.error(msg, {
                    position: 'top-center',
                });
            },
        });
    };

    return { grantRightsMutation, grantAdminRights, revokeRightsMutation, revokeAdminRights };
};
