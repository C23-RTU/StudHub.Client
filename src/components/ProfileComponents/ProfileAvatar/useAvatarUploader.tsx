import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import { userApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

export const useAvatarUploader = () => {
    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['upload-profile-avatar'],
        mutationFn: async (file: File) => await userApi.userUploadUserImage(file),
    });

    const uploadChange = async () => {
        const files = inputRef.current?.files;

        if (!files?.length) return;
        const { toast } = await import('react-hot-toast');

        await mutateAsync(files[0], {
            onSuccess: async ({ data }) => {
                toast.success('Фотография успешно изменена');

                queryClient.setQueryData(['fetch-profile'], (oldData: PersonDetailDTO) => {
                    return {
                        ...oldData,
                        imagePath: data,
                    };
                });
            },
            onError: async () => {
                toast.error('Не удалось обновить фото');
            },
        });
    };

    return {
        inputRef,
        uploadChange,
        isLoading: isPending,
    };
};
