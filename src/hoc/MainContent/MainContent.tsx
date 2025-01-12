import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren, DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export function MainContent({ className, children, ...props }: Props) {
    return (
        <main className={cn('flex flex-col gap-4', className)} {...props}>
            {children}
        </main>
    );
}
