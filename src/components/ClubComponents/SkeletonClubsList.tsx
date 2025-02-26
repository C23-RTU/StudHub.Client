import { SkeletonClubItem } from './SkeletonClubItem';

export function SkeletonClubsList({amount = 5} : {amount?: number}) {
    return Array(amount)
        .fill(0)
        .map((_, index) => <SkeletonClubItem key={index} />);
}
