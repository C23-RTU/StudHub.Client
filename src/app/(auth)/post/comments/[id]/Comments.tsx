'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem';
import { CommentMoreSheet } from '@/components/CommentComponents/CommentMoreSheet';
import { TextareaEditorComment } from '@/components/CommentComponents/TextareaEditorComment';
import { useCommentStore } from '@/components/CommentComponents/store/useComment.store';
import { Page } from '@/components/Page';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { commentApi, postApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Comments({ serverPost }: { serverPost: PostDetailDTO }) {
    const router = useRouter();

    const highlightComment = useCommentStore((store) => store.highlightComment);
    const resetHighlightComment = useCommentStore((store) => store.resetHighlightComment);

    const { data: post } = useQuery({
        queryKey: ['fetch-post', serverPost.id],
        queryFn: async () => (await postApi.postsGetById(serverPost.id)).data,
        initialData: serverPost,
    });

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-post-comments', serverPost.id],
        queryFn: async ({ pageParam }) => (await commentApi.commentsGetByPostId(serverPost.id, 0, pageParam, 100)).data,
        pageSize: 100,
    });

    useEffect(() => {
        if (!highlightComment) return;

        document
            .getElementById(`comment-${highlightComment.inReplyTo}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const timerId = setTimeout(() => {
            resetHighlightComment();
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightComment]);

    return (
        <Page className="p-0">
            <Header className="py-[12px]">
                <BackButton variant={'ghost'} onClick={() => router.back()} />
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard post={post} />
                <div className="flex flex-col gap-4 pb-[56px]">
                    {data?.pages && data?.pages.length === 0 && <p className="m-auto">Комментариев нет</p>}

                    {!isLoading &&
                        data?.pages?.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page.map((item, itemIndex) => (
                                    <Fragment key={item.id}>
                                        {itemIndex > 0 && <span className="bg-secondary mx-auto h-px w-3/5" />}
                                        <CommentItem comment={item} />
                                    </Fragment>
                                ))}
                            </Fragment>
                        ))}
                    {(isLoading || isFetchingNextPage) && (
                        <LoaderCircle className="mx-auto mt-10 size-10 animate-spin text-neutral-500" />
                    )}
                    {!isFetchingNextPage && <div ref={ref} />}

                    <TextareaEditorComment post={post} hasNextPage={hasNextPage} />
                </div>
                <CommentMoreSheet />
            </MainContent>
        </Page>
    );
}
