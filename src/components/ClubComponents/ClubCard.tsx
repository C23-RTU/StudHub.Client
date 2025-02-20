'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { SmallSubscribeButton } from './SubscribeButtons/SmallSubscribeButton';
import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { AUTH_PAGE } from '@/lib/config/routes.config';

interface Props {
    imageUrl: string | undefined | null;
    name: string;
    description: string | undefined | null;
    clubId: number;
}

export function ClubCard({ imageUrl, name, description, clubId }: Props) {
    const router = useRouter();

    return (
        <figure
            className="flex w-full hover:cursor-pointer items-center"
            role="listitem"
            onClick={() => router.push(`${AUTH_PAGE.CLUBS}/${clubId}`)}
        >
            <Image
                src={imageUrl ? getStaticImg(imageUrl) : '/img/blank.png'}
                alt={`${name}'s avatar`}
                width={32}
                height={32}
                className="rounded-lg w-12 h-12"
            />

            <div className="flex flex-col flex-grow ml-3 mr-3 justify-between overflow-hidden">
                <p
                    className="text-m font-geologica font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
                    title={name}
                >
                    {name}
                </p>
                <p
                    className="text-xs opacity-50 font-inter font-normal text-ellipsis overflow-hidden whitespace-nowrap"
                    title={description || ''}
                >
                    {description}
                </p>
            </div>

            <SmallSubscribeButton clubId={clubId} />
        </figure>
    );
}
