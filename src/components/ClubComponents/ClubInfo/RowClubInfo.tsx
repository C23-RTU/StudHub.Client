import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/utils';

interface IRowClubInfo extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
}

export function RowClubInfo({ className, onClick, children }: IRowClubInfo) {
    return (
        <section
            className={cn('flex gap-2 text-sm flex-row items-center cursor-pointer text-neutral-50', className)}
            onClick={onClick}
        >
            {children}
        </section>
    );
}
