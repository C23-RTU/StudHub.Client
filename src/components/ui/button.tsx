import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { LoaderCircleIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                red: 'bg-red-700 text-white hover:bg-red-600',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border border-border bg-background text-text hover:bg-background-light dark:bg-background-light dark:hover:bg-background-dimmed',
                secondary: 'bg-secondary text-white shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-background-dimmed ',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }), {
                'cursor-none': isLoading,
            })}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : props.children}
        </Comp>
    );
}

export { Button, buttonVariants };
