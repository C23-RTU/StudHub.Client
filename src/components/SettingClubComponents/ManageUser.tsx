import { PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PersonSummaryDTO } from '@/api/axios-client/models';

import { Button } from '../ui/button';

import { useManageClub } from './hooks/useManageClub';
import { useSettingClubStore } from './store/useSettingClubStore';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

export function ManageUser({
    user,
    clubId,
    useAddControl = false,
}: {
    user: PersonSummaryDTO;
    clubId: number;
    useAddControl?: boolean;
}) {
    const { grantRightsMutation, grantAdminRights } = useManageClub(clubId);

    const setUserToRemove = useSettingClubStore((store) => store.setUserToRemove);

    const removeHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUserToRemove(user);
    };

    const addHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await grantAdminRights(user.id);
    };

    return (
        <Link href={AUTH_PAGE.USER_PROFILE(user.id)} className="flex w-full items-center gap-4">
            <Image
                src={user.imagePath ? getStaticImg(user.imagePath) : '/img/default-club-avatar.png'}
                width={48}
                height={48}
                className="shrink-0 rounded-lg"
                alt={user.lastName}
            />

            <p
                className="font-geologica flex-1 overflow-hidden font-medium text-ellipsis whitespace-nowrap opacity-70"
                title={user.firstName}
            >
                {user.lastName} {user.firstName}
            </p>

            <div>
                {!useAddControl && (
                    <Button variant={'destructive'} className="h-10 w-10" onClick={(e) => removeHandler(e)}>
                        <Trash2Icon />
                    </Button>
                )}

                {useAddControl && (
                    <Button
                        variant={'default'}
                        isLoading={grantRightsMutation.isPending}
                        className="h-10 w-10"
                        onClick={addHandler}
                    >
                        <PlusIcon />
                    </Button>
                )}
            </div>
        </Link>
    );
}
