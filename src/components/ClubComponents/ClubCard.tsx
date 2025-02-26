'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { SubscribeButton } from './SubscribeButtons/SubscribeButton';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import type { ClubDetailDTO } from '@/api/axios-client';

interface Props {
    club: ClubDetailDTO;
    showSubscribe?: boolean;
}

export function ClubCard({ club, showSubscribe = false }: Props) {
    const router = useRouter();

    return (
        <figure className="flex w-full hover:cursor-pointer items-center" role="listitem">
            <Image
                src={club.imageUrl ? getStaticImg(club.imageUrl) : '/img/blank.png'}
                alt={`${club.name}'s avatar`}
                width={32}
                height={32}
                className="rounded-lg w-12 h-12"
                onClick={() => router.push(`${AUTH_PAGE.CLUBS}/${club.id}`)}
            />

            <div
                className="flex flex-col flex-grow ml-3 mr-3 justify-between overflow-hidden"
                onClick={() => router.push(`${AUTH_PAGE.CLUBS}/${club.id}`)}
            >
                <p
                    className="text-m font-geologica font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
                    title={club.name}
                >
                    {club.name}
                </p>
                <p
                    className="text-xs opacity-50 font-inter font-normal text-ellipsis overflow-hidden whitespace-nowrap"
                    title={club.about || ''}
                >
                    {club.about}
                </p>
            </div>
            {showSubscribe && <SubscribeButton clubId={String(club.id)} isBig={false} subscribed={club.isUserSubscribed} />}
        </figure>
    );
}
