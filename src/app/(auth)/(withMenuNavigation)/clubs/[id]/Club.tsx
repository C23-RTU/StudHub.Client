import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import ClubInfo from '@/components/ClubComponents/ClubInfo';
import ClubReportDialog from '@/components/ClubComponents/ClubReportDialog';
import { Page } from '@/components/Page';

import type { ClubDetailDTO } from '@/api/axios-client/models/club-detail-dto';

export function Club({ club }: { club: ClubDetailDTO }) {
    return (
        <div>
            <ClubHeader club={club} />
            <ClubInfo club={club} />
            <Page className="p-0">
                <ClubFeed />
            </Page>
            <ClubReportDialog />
        </div>
    );
}
