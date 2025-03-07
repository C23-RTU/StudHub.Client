'use client';

import { BellIcon } from 'lucide-react';

import { BadgeWrapper } from '../BadgeWrapper';

type Props = {
    count: number;
};

export function NotificationBadge({ count }: Props) {
    return (
        <BadgeWrapper onClick={() => console.log('Открываем уведомления')}>
            <BellIcon size={28} />
            {count > 0 && (
                <span className="text-[8px] px-1 py-[0.1rem] rounded-full bg-blue absolute leading-none bottom-[6px] right-[5px] select-none">
                    {count}
                </span>
            )}
        </BadgeWrapper>
    );
}
