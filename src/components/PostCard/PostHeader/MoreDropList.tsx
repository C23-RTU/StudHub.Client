import { CopyIcon, EllipsisIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const MORE_ITEMS = [
    {
        Icon: UserIcon,
        text: 'Перейти в профиль',
    },
    {
        Icon: CopyIcon,
        text: 'Скопировать ссылку',
    },
];

export function MoreDropList() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div
                className={cn('cursor-pointer active:bg-secondary transition-colors rounded-lg px-2 select-none', {
                    'bg-secondary': isOpen,
                })}
                onClick={() => setIsOpen(!isOpen)}
            >
                <EllipsisIcon />
            </div>

            {isOpen && (
                <>
                    <ul className="absolute right-0 top-[calc(100%+5px)] bg-secondary rounded-md w-max px-3 py-1 flex flex-col shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
                        {MORE_ITEMS.map(({ Icon, text }, index) => (
                            <li
                                className="flex items-center gap-2 py-3 [&:not(:last-child)]:border-b border-b-background"
                                key={index}
                            >
                                <Icon size={18} className="shirk-0" />
                                <p className="text-xs font-normal shrink-0">{text}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="fixed z-10 inset-0" onClick={() => setIsOpen(!isOpen)} />
                </>
            )}
        </div>
    );
}
