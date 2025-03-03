import { SkeletonItem } from '@/components/Skeletons/SkeletonItem';

export function SkeletonList({ amount = 3 }: { amount?: number }) {
    return (
        <div className="flex flex-col gap-4">
            {Array(amount)
                .fill(0)
                .map((_, index) => (
                    <SkeletonItem key={index} />
                ))}
        </div>
    );
}
