import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/utils';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export function Header({ children, className, ...props }: Props) {
    return (
        <header className={cn('flex items-center justify-between mb-4 min-h-[45px]', className)} {...props}>
            {children}
        </header>
    );
}

export function HeaderTitle({ children }: PropsWithChildren) {
    return <h1 className="text-xl font-semibold font-geologica">{children}</h1>;
}
