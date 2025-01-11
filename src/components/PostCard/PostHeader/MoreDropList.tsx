import { CopyIcon, EllipsisIcon, UserIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const MORE_ITEMS = [
    {
        Icon: UserIcon,
        text: 'Перейти в профиль',
    },
    {
        Icon: CopyIcon,
        text: 'Скопировать ссылку',
    },
];

export function MoreDropList() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className='hover:bg-neutral-700'>
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} className='bg-neutral-900 border-neutral-700 '>
                {MORE_ITEMS.map(({ Icon, text }, index) => (
                    <DropdownMenuItem key={index} className="flex gap-2 font-light font-inter">
                        <Icon size={20} />
                        {text}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
