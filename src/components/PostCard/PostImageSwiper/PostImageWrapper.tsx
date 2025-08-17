import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import LoaderImage from '@/components/ImageLoader/ImageLoader';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

const DynamicPostImageSwiper = dynamic(() => import('./PostImageSwiper').then((mod) => mod.PostImageSwiper), {
    loading: () => <p>Загрузка...</p>,
});

interface Props {
    images: string[];
}

export function PostImageWrapper({ images }: Props) {
    const isEmptyOrOne = useMemo(() => {
        return images.length === 1 || !images.length;
    }, [images]);

    return (
        <div className="mx-[calc(theme(padding.pageX)*-1)] flex w-auto items-center justify-center overflow-hidden rounded-md">
            {isEmptyOrOne ? (
                <LoaderImage
                    src={images.length ? getStaticImg(images[0]) : '/img/eventbanner.jpg'}
                    height={200}
                    width={600}
                    alt={'banner'}
                    className="h-auto w-full"
                />
            ) : (
                <DynamicPostImageSwiper images={images} />
            )}
        </div>
    );
}
