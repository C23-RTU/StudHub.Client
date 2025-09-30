import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import LoaderImage from '@/components/ImageLoader';

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
                <SwiperSlide key={index} className="relative h-auto! max-h-[500px]">
                    {/* Blurred background image */}
                    <div className="absolute inset-0 mx-0 overflow-hidden">
                        <LoaderImage
                            src={getStaticImg(img)}
                            width={1000}
                            height={1000}
                            alt=""
                            className="h-full w-full object-cover opacity-50 blur-lg"
                        />
                    </div>
                    {/* Main image */}
                    <LoaderImage
                        src={getStaticImg(img)}
                        width={1000}
                        height={1000}
                        alt={'Прикрепленное изображение'}
                        className="relative z-10 w-full object-contain"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
