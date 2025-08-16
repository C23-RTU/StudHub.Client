import { useRef, useState } from 'react';
import { CircleStencil, Cropper, type CropperRef } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css';

import { Button } from '../button';

type Props = {
    src: string;
    toggleHandler: (flag: boolean) => void;
    saveHandler: (blob: Blob) => Promise<void>;
};

export function BaseCropper({ src, toggleHandler, saveHandler }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const cropperRef = useRef<CropperRef>(null);

    const onCrop = () => {
        setIsLoading(true);
        const cropper = cropperRef.current;

        if (cropper) {
            const canvas = cropper.getCanvas();
            canvas?.toBlob(async (blob) => {
                if (blob) {
                    saveHandler(blob).finally(() => {
                        toggleHandler(false);
                        setIsLoading(false);
                    });
                }
            }, 'image/jpeg');
        }
    };

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-100 w-full max-w-screen justify-center bg-black">
            <Cropper
                stencilProps={{
                    grid: true,
                    aspectRatio: 1,
                }}
                stencilComponent={CircleStencil}
                className="h-[calc(100%-40px-var(--padding-pageY))]"
                src={src}
                ref={cropperRef}
            />
            <div className="relative mx-auto flex max-w-[46%] flex-row items-center justify-center gap-4">
                <Button
                    className="w-full"
                    variant={'outline'}
                    onClick={() => toggleHandler(false)}
                    disabled={isLoading}
                >
                    Отменить
                </Button>
                <Button isLoading={isLoading} className="w-full" onClick={() => onCrop()}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}
