import { SkeletonClubItem } from './SkeletonClubItem';

export function SkeletonClubsList() {
    return Array(5)
        .fill(0)
        .map((_, index) => <SkeletonClubItem key={index} />);
}
