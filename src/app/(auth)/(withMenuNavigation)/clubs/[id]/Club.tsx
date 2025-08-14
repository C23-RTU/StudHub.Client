import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import { Page } from '@/components/Page';

import type { ClubDetailDTO } from '@/api/axios-client/models/club-detail-dto';

export function Club({ club }: { club: ClubDetailDTO }) {
    return (
        <div className="border-border lg:border-x">
            <ClubHeader initClubData={club} />
            <Page className="p-0">
                <ClubFeed />
            </Page>
        </div>
    );
}
