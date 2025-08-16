import { Copy, EllipsisIcon, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { BiCopy, BiSolidMegaphone } from 'react-icons/bi';
import { IoIosShare, IoMdShare } from 'react-icons/io';
import { IoCopy } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PostDetailDTO } from '@/api/axios-client/models';

export function MoreDropList({ post }: { post: PostDetailDTO }) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-10 shrink-0 grow-0">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-text mr-4">
                <DropdownMenuItem onClick={() => router.push(AUTH_PAGE.CLUB(post.club.id))}>
                    <BiSolidMegaphone size={20} className="text-text" />
                    Перейти в клуб
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex items-center gap-1.5">
                        <IoIosShare size={20} className="text-text" />
                        Поделиться
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `https://setka-rtu.ru${AUTH_PAGE.POST_COMMENTS(post.id)}`
                                    );
                                    toast.success('Ссылка скопирована');
                                }}
                            >
                                <IoCopy size={20} className="text-text" />
                                Скопировать ссылку
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator
                                            .share({
                                                title: document.title,
                                                url: `https://setka-rtu.ru${AUTH_PAGE.POST_COMMENTS(post.id)}`,
                                            })
                                            .catch(console.error);
                                    } else {
                                        // На случай если юзер сидит с каким-нибудь Netscape Navigator.
                                        console.log('Web Share API not supported');
                                        navigator.clipboard.writeText(
                                            `https://setka-rtu.ru${AUTH_PAGE.POST_COMMENTS(post.id)}`
                                        );
                                        toast.success('Не удалось поделиться, ссылка скопирована в буфер обмена');
                                    }
                                }}
                            >
                                <IoMdShare className="text-text" size={20} />
                                Поделиться в...
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
