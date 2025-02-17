'use client';

import LoaderImage from '@/components/LoaderImage/LoaderImage';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    src: string | null | undefined;
    loaderSize?: number;
    size: number;
    alt?: string;
}

export function Avatar({ src, size, alt, loaderSize }: Props) {
    return (
        <div className={`overflow-hidden rounded-full h-[${size}px] w-[${size}px] shrink-0`}>
            <LoaderImage
                src={src ? getStaticImg(src) : '/img/avatar.png'}
                loaderSize={loaderSize}
                width={size}
                height={size}
                alt={alt || 'avatar'}
            />
        </div>
    );
}
