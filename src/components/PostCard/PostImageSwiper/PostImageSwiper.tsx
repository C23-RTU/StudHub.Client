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
                <SwiperSlide key={index} className="!h-auto max-h-[500px] relative">
                    {/* Blurred background image */}
                    <div className="absolute inset-0 overflow-hidden">
                        <LoaderImage
                            src={getStaticImg(img)}
                            width={1000}
                            height={1000}
                            alt=""
                            className="w-full h-full object-cover blur-lg opacity-50"
                        />
                    </div>
                    {/* Main image */}
                    <LoaderImage
                        src={getStaticImg(img)}
                        width={1000}
                        height={1000}
                        alt={'Прикрепленное изображение'}
                        className=" w-full object-contain relative z-10"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
