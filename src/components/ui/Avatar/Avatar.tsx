'use client';

import LoaderImage from '@/components/LoaderImage/LoaderImage';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    src: string | null | undefined;
    loaderSize?: number;
    width: number;
    height: number;
    alt?: string;
}

export function Avatar({ src, width, height, alt, loaderSize }: Props) {
    return (
        <div className={`overflow-hidden rounded-full h-[${height}px] w-[${width}px] shrink-0`}>
            <LoaderImage
                src={src ? getStaticImg(src) : '/img/avatar.png'}
                loaderSize={loaderSize}
                width={width}
                height={height}
                alt={alt || 'avatar'}
            />
        </div>
    );
}
