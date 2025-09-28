'use client';

import { Loader2 } from 'lucide-react';
import { Fragment } from 'react';

import { ProfileAvatarUploader } from '@/components/ProfileComponents/ProfileAvatar/ProfileAvatarUploader';

import { useProfile } from '@/hooks/useProfile';

export default function UserCard() {
    const { data: user, isLoading } = useProfile();
    return (
        <Fragment>
            {isLoading && <Loader2 className={'animate-spin p-4'} color={'#fff'} />}
            {!isLoading && (
                <>
                    <ProfileAvatarUploader avatarSrc={user?.imagePath} />
                    <div className="my-auto flex flex-col gap-0">
                        <p className="font-geologica max-w-[250px] overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.about}</p>
                    </div>
                </>
            )}
        </Fragment>
    );
}
