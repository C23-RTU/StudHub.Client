import { EllipsisIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
                <Button variant="ghost" size="icon" className="hover:bg-neutral-700">
                    <EllipsisIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} className="bg-neutral-900 border-neutral-700 ">
                <DropdownMenuItem
                    className="flex gap-2 font-light font-inter"
                    onClick={() => router.push(AUTH_PAGE.CLUB(post.club.id))}
                >
                    <UserIcon size={20} />
                    Перейти в клуб
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
