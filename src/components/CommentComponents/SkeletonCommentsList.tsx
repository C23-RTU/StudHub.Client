import { SkeletonCommentItem } from '@/components/CommentComponents/SkeletonCommentItem';

export function SkeletonCommentsList() {
    return Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCommentItem key={index} />);
}
