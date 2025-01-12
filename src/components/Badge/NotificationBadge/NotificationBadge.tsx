'use client';

import { BellIcon } from 'lucide-react';

import { BadgeWrapper } from '../BadgeWrapper';

export function NotificationBadge() {
    return (
        <BadgeWrapper onClick={() => console.log('Открываем уведомления')}>
            <BellIcon size={28} />
            <span className="text-[8px] px-1 py-[0.1rem] rounded-full bg-blue absolute leading-none bottom-[6px] right-[5px] select-none">
                1
            </span>
        </BadgeWrapper>
    );
}
