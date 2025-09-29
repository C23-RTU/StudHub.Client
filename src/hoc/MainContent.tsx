import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/utils';

interface Props extends PropsWithChildren, DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export function MainContent({ className, children, ...props }: Props) {
    return (
        <main className={cn('mb-10 flex w-full flex-col gap-4', className)} {...props}>
            {children}
        </main>
    );
}
