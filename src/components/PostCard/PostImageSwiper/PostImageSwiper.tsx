import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import LoaderImage from '@/components/ImageLoader/ImageLoader';

import { getStaticImg } from '@/lib/helpers/getStaticImg.helper';

interface Props {
    images: string[];
}

export function PostImageSwiper({ images }: Props) {
    return (
        <Swiper
            pagination={{
                enabled: true,
                clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index} className="!h-auto max-h-[500px]">
                    <LoaderImage
                        src={getStaticImg(img)}
                        height={200}
                        width={600}
                        alt={'banner'}
                        className="rounded-md w-full object-contain"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
