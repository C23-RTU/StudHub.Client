import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { userApi } from '@/api/api';
import type { PersonDetailDTO } from '@/api/axios-client';

export const useAvatarUploader = () => {
    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpenCropper, setOpenCropper] = useState(false);
    const [newAvatarImageUrl, setNewAvatarImageUrl] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['upload-profile-avatar'],
        mutationFn: async (file: File) => await userApi.userUploadUserImage(file),
    });

    const uploadChange = async () => {
        const files = inputRef.current?.files;

        if (!files?.length) return;

        setNewAvatarImageUrl(URL.createObjectURL(files[0]));
        setOpenCropper(true);
    };

    const uploadAction = async (blob: Blob) => {
        const { toast } = await import('react-hot-toast');
        const file = new File([blob], `avatar-${Date.now()}.png`);
        await mutateAsync(file, {
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
        uploadAction,
        newAvatarUrl: newAvatarImageUrl,
        isLoading: isPending,
        isOpenCropper,
        setOpenCropper,
    };
};
