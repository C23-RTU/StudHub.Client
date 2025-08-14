'use client';

import { FaBell } from 'react-icons/fa';

import { BadgeWrapper } from '../BadgeWrapper';

type Props = {
    count: number;
};

export function NotificationBadge({ count }: Props) {
    return (
        <BadgeWrapper onClick={() => console.log('Открываем уведомления')}>
            <FaBell size={20} />
            {count > 0 && (
                <span className="bg-primary absolute right-[5px] bottom-[6px] rounded-full px-1 py-[0.1rem] text-[8px] leading-none select-none">
                    {count}
                </span>
            )}
        </BadgeWrapper>
    );
}
