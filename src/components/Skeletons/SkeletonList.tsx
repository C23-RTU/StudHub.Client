import { SkeletonItem } from '@/components/Skeletons/SkeletonItem';

export function SkeletonList() {
    return (
        <div className="flex flex-col gap-4">
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <SkeletonItem key={index} />
                ))}
        </div>
    );
}
