import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex w-full rounded-md transition duration-200 border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus:ring-1 focus:ring-neutral-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
