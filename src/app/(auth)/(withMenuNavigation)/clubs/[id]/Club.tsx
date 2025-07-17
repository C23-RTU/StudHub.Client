import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';

import type { ClubDetailDTO } from '@/api/axios-client/models/club-detail-dto';

export function Club({ club }: { club: ClubDetailDTO }) {
    return (
        <div>
            <ClubHeader initClubData={club} />
            <div className="page flex flex-col gap-4">
                <ClubFeed />
            </div>
        </div>
    );
}
