import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export function Header({ children, className, ...props }: Props) {
    return (
        <div className={cn('flex items-center justify-between mb-4 min-h-[45px]', className)} {...props}>
            {children}
        </div>
    );
}

export function HeaderTitle({ children }: PropsWithChildren) {
    return <h1 className="text-xl font-semibold">{children}</h1>;
}
