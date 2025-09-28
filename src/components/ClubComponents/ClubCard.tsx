import Image from 'next/image';
import Link from 'next/link';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { ClubDetailDTO } from '@/api/axios-client';

import { SubscribeButton } from './SubscribeButtons/SubscribeButton';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    club: ClubDetailDTO;
    showSubscribe?: boolean;
}

export function ClubCard({ club, showSubscribe = false }: Props) {
    return (
        <article
            className="flex w-full flex-row items-center justify-between gap-3 rounded-lg"
            aria-label={`Club: ${club.name}`}
        >
            <Link
                href={AUTH_PAGE.CLUB(club.id)}
                className="flex min-w-0 flex-1 items-center gap-3"
                aria-label={`View details for ${club.name}`}
            >
                <div className="flex-shrink-0">
                    <Image
                        src={club.imageUrl ? getStaticImg(club.imageUrl) : '/img/default-club-avatar.png'}
                        alt={`${club.name}'s avatar`}
                        width={48}
                        height={48}
                        className="size-12 rounded-lg object-cover"
                        onError={(e) => {
                            e.currentTarget.src = '/img/default-club-avatar.png';
                        }}
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden">
                    <p className="text-md font-geologica truncate font-semibold" title={club.name}>
                        {club.name}
                    </p>
                    <p className="font-inter truncate text-xs font-normal text-neutral-400" title={club.about || ''}>
                        {club.about || 'Описание отсутствует'}
                    </p>
                </div>
            </Link>

            {showSubscribe && (
                <div className="flex-shrink-0">
                    <SubscribeButton
                        className="size-10"
                        clubId={club.id}
                        isBig={false}
                        subscribed={club.isUserSubscribed}
                    />
                </div>
            )}
        </article>
    );
}
