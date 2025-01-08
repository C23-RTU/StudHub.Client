import Image from 'next/image';

import { PostActionButton } from './PostActionButton';
import { PostHeader } from './PostHeader/PostHeader';

export function PostCard() {
    return (
        <div className="flex flex-col gap-3">
            <PostHeader />

            <div>
                <p className="text-sm text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu nibh at suscipit.
                    Maecenas consectetur vestibulum felis ut pharetra. Donec finibus vestibulum rhoncus. Nullam leo
                    velit, imperdiet et efficitur non, gravida ac mi. Pellentesque vitae posuere ante. Etiam eu aliquet
                    purus. Nulla eget volutpat lorem. In hac habitasse platea dictumst.
                </p>
            </div>
            <div className="flex gap-2">
                <p className="px-4 py-1.5 bg-secondary rounded-[100px] text-xss w-fit">#РТУ</p>
                <p className="px-4 py-1.5 bg-secondary rounded-[100px] text-xss w-fit">#2025</p>
                <p className="px-4 py-1.5 bg-secondary rounded-[100px] text-xss w-fit">#NewYear</p>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
                <Image src={'/img/banner.png'} height={200} width={600} alt={'banner'} className="rounded-md" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <PostActionButton type={'like'} value={110} />
                    <PostActionButton type={'comment'} value={'54'} />
                </div>

                <p className="text-xs opacity-50">12 дек. 2024г.</p>
            </div>
        </div>
    );
}
