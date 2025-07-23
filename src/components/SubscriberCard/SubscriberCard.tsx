'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    firstName: string;
    lastName: string;
    avatar: string | null | undefined;
    userId: number;
}

export function SubscriberCard({ firstName, lastName, avatar, userId }: Props) {
    return (
        <Link
            className="bg-secondary flex w-full rounded-lg px-2 py-2"
            role="listitem"
            href={`${AUTH_PAGE.PROFILE}/${userId}`}
        >
            <div className="relative">
                <Image
                    src={(avatar && avatar.trim() !== '' && getStaticImg(avatar)) || '/img/default-user-avatar.png'}
                    alt={`Фото профиля ${firstName}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 min-w-[40px] overflow-hidden rounded-full"
                />
                {/* <div
                    className={`w-3 h-3 rounded-full border border-bg absolute right-0 bottom-0 ${
                        status === 'online' ? 'bg-emerald-400' : 'bg-red-500'
                    }`}
                    role="status"
                    aria-label={`User is ${status}`}
                /> */}
            </div>

            <div className="ml-3 flex flex-col justify-center overflow-hidden">
                <p className="text-m font-geologica overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
                    <span>{firstName} </span>
                    <span>{lastName}</span>
                </p>
                {/* <p
                    className="text-xs opacity-50 font-inter font-normal text-ellipsis overflow-hidden whitespace-nowrap"
                    title={role}
                >
                    {role}
                </p> */}
            </div>
        </Link>
    );
}
