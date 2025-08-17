import { cn } from '@/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('bg-secondary block animate-pulse rounded-md', className)} {...props} />;
}

function SkeletonList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col gap-4', className)} {...props}>
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-[50px]" />
            ))}
        </div>
    );
}

export { Skeleton, SkeletonList };
