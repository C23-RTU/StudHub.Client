import Image from 'next/image';

import { MoreDropList } from './MoreDropList';

export function PostHeader() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Image src={'/img/avatar.png'} width={40} height={40} alt="avatar" />
                <div className="flex flex-col ml-3">
                    <p className="text-sm font-semibold">Станислав Алексеевич Кудж</p>
                    <small className="text-[10px] font-normal">Ректор РТУ МИРЭА</small>
                </div>
            </div>

            <MoreDropList />
        </div>
    );
}
