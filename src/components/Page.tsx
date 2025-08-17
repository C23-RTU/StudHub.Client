import React from 'react';

import { cn } from '@/lib/utils/utils';

type Props = {
    className?: string;
    children: React.ReactNode;
};

const Page = React.forwardRef<HTMLDivElement, Props>(({ className = '', children }, ref) => {
    return (
        <div
            className={cn(
                'border-border mx-auto h-full min-h-screen w-full max-w-[600px] border-x-0 md:border-x',
                className
            )}
            ref={ref}
        >
            {children}
        </div>
    );
});

Page.displayName = 'Page';

export { Page };
