'use client';

import Image from 'next/image';

interface Props {
    firstName: string;
    lastName: string;
    avatar: string | null | undefined;
    role: string;
}

export function SubscriberCard({ firstName, lastName, avatar, role }: Props) {
    return (
        <div className="flex w-full bg-secondary py-2 px-2 rounded-lg" role="listitem">
            <div className="relative">
                <Image
                    src={avatar || '/img/avatar.png'}
                    alt={`Фото профиля ${firstName}`}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 min-w-[40px]"
                />
                {/* <div
                    className={`w-3 h-3 rounded-full border border-bg absolute right-0 bottom-0 ${
                        status === 'online' ? 'bg-emerald-400' : 'bg-red-500'
                    }`}
                    role="status"
                    aria-label={`User is ${status}`}
                /> */}
            </div>

            <div className="flex flex-col ml-3 justify-between overflow-hidden">
                <p className="text-m font-geologica font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    <span>{firstName} </span>
                    <span>{lastName}</span>
                </p>
                <p
                    className="text-xs opacity-50 font-inter font-normal text-ellipsis overflow-hidden whitespace-nowrap"
                    title={role}
                >
                    {role}
                </p>
            </div>
        </div>
    );
}
