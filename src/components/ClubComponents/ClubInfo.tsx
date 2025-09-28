import dynamic from 'next/dynamic';
import Link from 'next/link';

import LoaderImage from '@/components/ImageLoader';
import { Skeleton } from '@/components/ui/skeleton';

import type { ClubDetailDTO } from '@/api/axios-client';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

const SubscribeButtonDynamic = dynamic(
    () => import('./SubscribeButtons/SubscribeButton').then((mod) => mod.SubscribeButton),
    {
        loading: () => <Skeleton className="bg-background h-10 w-full rounded-md" />,
    }
);

export default function ClubInfo({ club }: { club: ClubDetailDTO }) {
    const displaySubscribers = () => {
        const subscribers = club?.subscriberCount || 0;

        const lastDigit = subscribers % 10;
        const lastTwoDigits = subscribers % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `подписчиков`;
        if (lastDigit === 1) return `подписчик`;
        if (lastDigit >= 2 && lastDigit <= 4) return ` подписчика`;

        return `подписчиков`;
    };
    return (
        <div className="border-border relative mx-auto flex w-full max-w-[600px] flex-col items-center border-x-0 border-b pb-4 md:border-x">
            <div className="flex w-full items-center justify-center">
                <LoaderImage
                    src={club?.bannerUrl ? getStaticImg(club.bannerUrl) : '/img/default-club-banner.jpg'}
                    height={250}
                    width={1000}
                    alt={'banner'}
                    className="h-[200px] w-full object-cover"
                />
            </div>

            <div className="mt-[-40px] flex h-full w-full flex-row px-4">
                <LoaderImage
                    src={club?.imageUrl ? getStaticImg(club.imageUrl) : '/img/default-club-avatar.png'}
                    height={128}
                    width={128}
                    alt={'avatar'}
                    className="border-background-light size-[100px] rounded-full border-[5px] p-0"
                />
                <SubscribeButtonDynamic
                    clubId={club?.id}
                    isBig={true}
                    className="z-40 mt-[56px]"
                    subscribed={club?.isUserSubscribed}
                />
            </div>
            <div className="flex w-full flex-col gap-2 p-4 pt-2 pb-0">
                <h1 className="font-geologica text-text text-lg font-bold">{club?.name}</h1>
                <p className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">{club?.about}</p>
                <Link href={`/clubs/${club?.id}/subscribers`} className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{club?.subscriberCount}</span>{' '}
                    {displaySubscribers()}
                </Link>
            </div>

            {/* <div className="bg-secondary flex flex-col gap-5 rounded-b-xl px-5 pb-5"> */}
            {/*     <ClubInfo club={club} /> */}
            {/* </div> */}
        </div>
    );
}
