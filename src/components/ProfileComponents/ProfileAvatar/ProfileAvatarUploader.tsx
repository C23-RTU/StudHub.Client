'use client';

import { PencilIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useId } from 'react';

import { Avatar } from '@/components/ui/Avatar/Avatar';

import { useAvatarUploader } from './useAvatarUploader';

const BaseCropperDynamic = dynamic(() => import('@/components/ui/Cropper/Cropper').then((mod) => mod.BaseCropper));

export function ProfileAvatarUploader({ avatarSrc }: { avatarSrc?: string | null }) {
    const id = useId();

    const { inputRef, uploadChange, isOpenCropper, setOpenCropper, newAvatarUrl, uploadAction } = useAvatarUploader();

    return (
        <>
            {isOpenCropper && (
                <BaseCropperDynamic
                    src={newAvatarUrl || `avatar_${Date.now}`}
                    toggleHandler={(flag) => setOpenCropper(flag)}
                    saveHandler={uploadAction}
                />
            )}

            <label htmlFor={id} className="relative cursor-pointer overflow-hidden rounded-full">
                <Avatar src={avatarSrc} size={80} alt={'Изображение профиля'} />
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-75">
                    <PencilIcon color="#fff" className="z-1" size={20} />
                    <div className="absolute h-full w-full bg-black opacity-50" />
                </div>
                <input
                    type="file"
                    hidden
                    id={id}
                    ref={inputRef}
                    onChange={uploadChange}
                    multiple={false}
                    accept="image/*"
                />
            </label>
        </>
    );
}
