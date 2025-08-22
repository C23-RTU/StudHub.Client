import { cn } from '@/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('bg-secondary block animate-pulse rounded-md', className)} {...props} />;
}

function SkeletonList({
    className,
    classNameSkeletonItem,
    count = 3,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    count?: number;
    classNameSkeletonItem?: string;
}) {
    return (
        <div className={cn('flex flex-col gap-4', className)} {...props}>
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton key={index} className={cn('h-[50px]', classNameSkeletonItem)} />
            ))}
        </div>
    );
}

export { Skeleton, SkeletonList };
