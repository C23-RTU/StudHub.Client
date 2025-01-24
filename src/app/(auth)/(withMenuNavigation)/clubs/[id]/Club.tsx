'use client';

import { ClubFeed } from '@/components/ClubComponents/ClubFeed';
import { ClubHeader } from '@/components/ClubComponents/ClubHeader';
import { ClubInfo } from '@/components/ClubComponents/ClubInfo/ClubInfo';
import { SubscribeButton } from '@/components/ClubComponents/SubscribeButton';

export function Club({ id = '1' }: { id: string }) {
    return (
        <div className="relative p-0">
            <ClubHeader />

            <div className="page pt-0">
                <ClubInfo clubId={id} />

                <SubscribeButton />

                <ClubFeed />
            </div>
        </div>
    );
}
