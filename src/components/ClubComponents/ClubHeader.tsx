import { Copy, EllipsisVertical, OctagonAlert } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { BackButton } from '../ui/BackButton/BackButton';
import { Button } from '../ui/button';

export function ClubHeader() {
    const router = useRouter();

    return (
        <div>
            <div className="fixed flex flex-row justify-between items-center p-4 w-full max-w-[1024px]">
                <div className="flex flex-row items-center">
                    <BackButton onClick={() => router.push(AUTH_PAGE.CLUBS)} />
                    <p
                        className="text-lg ml-4 font-bold shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary font-geologica rounded-lg leading-8 h-10 py-1 px-3 hover:cursor-pointer"
                        onClick={() => navigator.clipboard.writeText('@IKB_MIREA')}
                    >
                        @IKB_MIREA
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'outline'}
                            size="icon"
                            className="rounded-lg w-10 h-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-secondary"
                        >
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Copy />
                            Скопировать ссылку
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-[#FF0000]">
                            <OctagonAlert stroke="#FF0000" />
                            Пожаловаться
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="w-full h-full flex items-center justify-center">
                <Image
                    src={'/img/background.jpg'}
                    height={200}
                    width={600}
                    alt={'banner'}
                    className="rounded-b-3xl w-full"
                />
            </div>

            <div className="w-full h-full flex items-center justify-center mt-[-90px]">
                <Image src={'/img/profile.png'} height={158} width={158} alt={'banner'} className="rounded-b-lg" />
            </div>
        </div>
    );
}
