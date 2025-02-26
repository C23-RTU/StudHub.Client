import { SkeletonItem } from '@/components/CommentComponents/SkeletonItem';

export function SkeletonList() {
    return Array(3)
        .fill(0)
        .map((_, index) => <SkeletonItem key={index} />);
}
