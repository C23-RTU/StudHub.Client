'use client';

import LoaderImage from '@/components/ImageLoader';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';
import { cn } from '@/lib/utils/utils';

interface Props {
    src: string | null | undefined;
    size?: number;
    alt?: string;
    className?: string;
}

export function Avatar({ src, size = 40, alt, className }: Props) {
    return (
        <div
            className={cn('shrink-0 overflow-hidden rounded-full', className)}
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
        >
            <LoaderImage
                src={src ? getStaticImg(src) : '/img/default-user-avatar.png'}
                className="object-cover"
                width={size}
                height={size}
                alt={alt || 'avatar'}
            />
        </div>
    );
}
