'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import { useClubsRole } from '@/hooks/useClubsRole';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { postApi } from '@/api/api';

import Loader from '../Loader';
import { PostCard } from '../PostCard/PostCard';
import { Button } from '../ui/button';

import { MainContent } from '@/hoc/MainContent/MainContent';
import { CLUB_ROLES } from '@/lib/enums/club-roles.enum';

export function ClubFeed() {
    const { id } = useParams();
    const clubId = Number(id);

    const { checkRole } = useClubsRole();

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: async ({ pageParam = 0 }) => (await postApi.postsGetByClubId(clubId, pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <MainContent className="flex flex-col gap-0">
            {checkRole(clubId) === CLUB_ROLES.OWNER && (
                <div className="border-border border-b p-4">
                    <Button variant={'default'} className="w-full" asChild>
                        <Link href={AUTH_PAGE.POST_DRAFT}>
                            <PencilIcon />
                            Создать пост
                        </Link>
                    </Button>
                </div>
            )}

            <div className="flex flex-col gap-0">
                {(isLoading || isFetchingNextPage) && <Loader className="mx-auto mt-10 size-10" />}
                {data && data.pages.flatMap((page) => page).map((post) => <PostCard key={post.id} post={post} />)}
                {!hasNextPage && !isLoading && (
                    <p className="p-4 pb-[20px] text-center text-neutral-500">Посты этого клуба закончились</p>
                )}
                <div ref={ref}></div>
            </div>
        </MainContent>
    );
}
