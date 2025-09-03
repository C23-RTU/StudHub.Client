'use client';

import dynamic from 'next/dynamic';

import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import { Page } from '@/components/Page';

import type { ClubDetailDTO } from '@/api/axios-client/models/club-detail-dto';

const ClubReportDialogDynamic = dynamic(() => import('@/components/ClubComponents/ClubReportDialog'), {
    ssr: false,
});

export function Club({ club }: { club: ClubDetailDTO }) {
    return (
        <div>
            <ClubHeader initClubData={club} />
            <Page className="p-0">
                <ClubFeed />
            </Page>
            <ClubReportDialogDynamic />
        </div>
    );
}
