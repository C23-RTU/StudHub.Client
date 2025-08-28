import { EllipsisIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
                    Перейти в клуб
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-sm"
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
                            navigator.clipboard.writeText(`https://setka-rtu.ru${AUTH_PAGE.POST_COMMENTS(post.id)}`);
                            toast.success('Не удалось поделиться, ссылка скопирована в буфер обмена');
                        }
                    }}
                >
                    Поделиться
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="text-red-400">
                    Пожаловаться
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
