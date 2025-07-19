'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { ClubDetailDTO } from '@/api/axios-client';

import { SubscribeButton } from './SubscribeButtons/SubscribeButton';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    club: ClubDetailDTO;
    showSubscribe?: boolean;
}

export function ClubCard({ club, showSubscribe = false }: Props) {
    const router = useRouter();

    return (
        <figure className="flex w-full items-center hover:cursor-pointer" role="listitem">
            <Image
                src={club.imageUrl ? getStaticImg(club.imageUrl) : '/img/default-club-avatar.png'}
                alt={`${club.name}'s avatar`}
                width={256}
                height={256}
                className="h-12 w-12 rounded-lg"
                onClick={() => router.push(AUTH_PAGE.CLUB(club.id))}
            />

            <div
                className="mr-3 ml-3 flex grow flex-col justify-between overflow-hidden"
                onClick={() => router.push(AUTH_PAGE.CLUB(club.id))}
            >
                <p
                    className="text-m font-geologica overflow-hidden font-semibold text-ellipsis whitespace-nowrap"
                    title={club.name}
                >
                    {club.name}
                </p>
                <p
                    className="font-inter overflow-hidden text-xs font-normal text-ellipsis whitespace-nowrap opacity-50"
                    title={club.about || ''}
                >
                    {club.about}
                </p>
            </div>
            {showSubscribe && <SubscribeButton clubId={club.id} isBig={false} subscribed={club.isUserSubscribed} />}
        </figure>
    );
}
