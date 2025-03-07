'use client';

import LoaderImage from '@/components/ImageLoader/ImageLoader';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    src: string | null | undefined;
    loaderSize?: number;
    size?: number;
    alt?: string;
}

export function Avatar({ src, size = 40, alt, loaderSize }: Props) {
    return (
        <div
            className={`overflow-hidden rounded-full shrink-0`}
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
        >
            <LoaderImage
                src={src ? getStaticImg(src) : '/img/default-user-avatar.png'}
                loaderSize={loaderSize}
                width={size}
                height={size}
                alt={alt || 'avatar'}
            />
        </div>
    );
}
