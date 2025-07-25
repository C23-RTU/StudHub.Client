import { cn } from '@/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('bg-secondary block animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
