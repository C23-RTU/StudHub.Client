import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'placeholder:text-muted-foreground text-md flex w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 transition duration-200 focus:ring-1 focus:ring-neutral-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
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
