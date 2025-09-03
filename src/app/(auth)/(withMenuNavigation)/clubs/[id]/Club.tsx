import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import ClubReportDialog from '@/components/ClubComponents/ClubReportDialog';
import { Page } from '@/components/Page';

import type { ClubDetailDTO } from '@/api/axios-client/models/club-detail-dto';

export function Club({ club }: { club: ClubDetailDTO }) {
    return (
        <div>
            <ClubHeader initClubData={club} />
            <Page className="p-0">
                <ClubFeed />
            </Page>
            <ClubReportDialog />
        </div>
    );
}
