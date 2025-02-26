import { SkeletonCommentItem } from '@/components/CommentComponents/SkeletonCommentItem';

export function SkeletonCommentsList() {
    return (
        <div className="flex flex-col gap-4">
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <SkeletonCommentItem key={index} />
                ))}
        </div>
    );
}
