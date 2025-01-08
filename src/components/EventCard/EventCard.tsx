import Image from 'next/image';

export function EventCard() {
    return (
        <div className="flex justify-center relative overflow-hidden rounded-[8px]">
            <div className="flex justify-center w-full">
                <Image src={'/img/banner.png'} width={600} height={300} alt="" />
            </div>

            <div className="bg-white px-2 py-1 z-10 absolute rounded-md top-2 left-2">
                <p className="uppercase text-[#4B4B4B] text-xs font-light">СКОРО НАЧНЕТСЯ</p>
            </div>

            <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-[#1F1F1F] opacity-90" />

            <div className="flex flex-col gap-1 absolute bottom-2 right-2 left-2 z-10">
                <small className="text-xss text-[#777777]">01 January 1970 12:00:00 AM</small>
                <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
                <p className="text-xs text-[#C9C9C9]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu nibh at suscipit.{' '}
                </p>
            </div>
        </div>
    );
}
