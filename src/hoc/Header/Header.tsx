import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/utils';

interface HeaderProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

interface HeaderTitleProps extends PropsWithChildren, HTMLAttributes<HTMLHeadingElement> {}

export function Header({ children, className, ...props }: HeaderProps) {
    return (
        <header className={cn('mb-4 flex min-h-[45px] items-center justify-between', className)} {...props}>
            {children}
        </header>
    );
}

export function HeaderTitle({ children, className, ...props }: HeaderTitleProps) {
    return (
        <h1 className={cn('font-geologica text-xl font-semibold', className)} {...props}>
            {children}
        </h1>
    );
}
