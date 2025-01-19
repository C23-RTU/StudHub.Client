'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

interface Props {
    status: 'online' | 'offline';
    name: string;
    avatar: string;
    role: string;
}

export function SubscriberCard({ status = 'offline', name, avatar, role }: Props) {
    return (
        <div className="flex w-full bg-secondary py-2 px-4 rounded-lg">
            <div className="flex relative">
                <Image src={avatar} width={40} height={40} alt="avatar" />
                {status === 'online' ? (
                    <div className="w-3 h-3 bg-emerald-400 rounded-full border border-bg absolute right-0 bottom-0"></div>
                ) : (
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-bg absolute right-0 bottom-0"></div>
                )}
            </div>

            <div className="flex flex-col ml-3 justify-between">
                <p className="text-m font-geologica font-semibold">{name}</p>
                <p className="text-xs opacity-50 font-inter font-normal">{role}</p>
            </div>

            <a href="#" className="bg-primary rounded-lg flex justify-center items-center w-8 h-8 ml-auto hover:cursor-pointer hover:bg-primary/80 self-center">
                <ArrowUpRight size={20} />
            </a>
        </div>
    );
}
