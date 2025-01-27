'use client';

import Image from 'next/image';

import { SmallSubscribeButton } from './SmallSubscribeButton';

interface Props {
    image: string;
    name: string;
    description: string;
}

export function ClubCard({ image, name, description }: Props) {
    return (
        <article className="flex w-full hover:cursor-pointer" role="listitem">
            <div>
                <Image
                    src={image}
                    alt={`${name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-md w-14 h-14 min-w-[40px]"
                />
            </div>

            <div className="flex flex-col flex-grow ml-3 justify-between overflow-hidden">
                <p
                    className="text-m font-geologica font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
                    title={name}
                >
                    {name}
                </p>
                <p
                    className="text-xs opacity-50 font-inter font-normal text-ellipsis overflow-hidden whitespace-nowrap"
                    title={description}
                >
                    {description}
                </p>
            </div>

            <div>
                <SmallSubscribeButton />
            </div>
        </article>
    );
}
