'use client';

import { LoaderCircle, PencilIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { postApi } from '@/api/api';

import { PostCard } from '../PostCard/PostCard';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

import { MainContent } from '@/hoc/MainContent/MainContent';

const PostTextEditorDynamic = dynamic(
    () => import('../PostTextEditor/PostTextEditor').then((mod) => mod.PostTextEditor),
    {
        ssr: false,
        loading: () => (
            <div className="bg-background fixed top-0 right-0 bottom-0 left-0 z-100 flex items-center justify-center">
                <LoaderCircle className="animate-spin" size={30} />
            </div>
        ),
    }
);

export function ClubFeed() {
    const { id } = useParams();
    const clubId = Number(id);
    const [isOpenCreatePostEditor, setIsOpenCreatePostEditor] = useState(false);

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: async ({ pageParam = 0 }) => (await postApi.postsGetByClubId(clubId, pageParam, 10)).data,
        pageSize: 10,
    });

    return (
        <MainContent>
            {isOpenCreatePostEditor &&
                createPortal(<PostTextEditorDynamic toggleOpen={setIsOpenCreatePostEditor} />, document.body)}

            <p className="font-geologica text-xl font-semibold">Посты клуба</p>

            <Button variant={'default'} onClick={() => setIsOpenCreatePostEditor(true)}>
                <PencilIcon />
                Создать пост
            </Button>

            <div className="flex flex-col gap-10">
                {(isLoading || isFetchingNextPage) &&
                    Array(3)
                        .fill(0)
                        .map((_, index) => <Skeleton key={index} className="h-[320px] w-full" />)}
                {data && data.pages.flatMap((page) => page).map((post) => <PostCard key={post.id} post={post} />)}
                {!hasNextPage && <p className="text-center text-neutral-400">Посты этого клуба закончились</p>}
                <div ref={ref}></div>
            </div>
        </MainContent>
    );
}
