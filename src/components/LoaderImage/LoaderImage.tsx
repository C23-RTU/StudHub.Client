import { LoaderCircle } from 'lucide-react';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface LoaderImageProps extends ImageProps {
    src: string;
    loaderSize?: number;
    alt: string;
}

const LoaderImage: React.FC<LoaderImageProps> = ({ src, alt, loaderSize = 30, ...props }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full flex justify-center">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <LoaderCircle className="animate-spin" size={loaderSize} />
                </div>
            )}
            <Image src={src} alt={alt} onLoad={() => setLoading(false)} {...props} />
        </div>
    );
};

export default LoaderImage;
