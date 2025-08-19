import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import Loader from '../Loader';

import { cn } from '@/lib/utils/utils';

interface LoaderImageProps extends ImageProps {
    src: string;
    loaderClassName?: string;
    alt: string;
}

const LoaderImage: React.FC<LoaderImageProps> = ({ src, alt, loaderClassName = '', ...props }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className={cn('relative flex h-full w-full', loaderClassName)}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="size-7" />
                </div>
            )}
            <Image src={src} alt={alt} onLoad={() => setLoading(false)} {...props} />
        </div>
    );
};

export default LoaderImage;
