'use client';

import { ArrowUpRight } from 'lucide-react';

interface Props {
    status: 'online' | 'offline';
    name: string;
    avatar: string;
    role: string;
}

export function SubscriberCard({ status = 'offline', name, avatar, role }: Props) {
    return (
        <div className="flex w-full bg-secondary py-2 px-2 rounded-lg" role="listitem">
            <div className="relative">
                <img src={avatar} alt={`${name}'s avatar`} className="rounded-full w-10 h-10 min-w-[40px]" />
                <div
                    className={`w-3 h-3 rounded-full border border-bg absolute right-0 bottom-0 ${
                        status === 'online' ? 'bg-emerald-400' : 'bg-red-500'
                    }`}
                    role="status"
                    aria-label={`User is ${status}`}
                />
            </div>

            <div className="flex flex-col ml-3 justify-between overflow-hidden">
                <p
                    className="text-m font-geologica font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
                    title={name}
                >
                    {name}
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
