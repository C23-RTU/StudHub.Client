'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useMemo } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem';
import { CommentMoreSheet } from '@/components/CommentComponents/CommentMoreSheet';
import { TextareaEditorComment } from '@/components/CommentComponents/TextareaEditorComment';
import { useCommentStore } from '@/components/CommentComponents/store/useComment.store';
import Loader from '@/components/Loader';
import { Page } from '@/components/Page';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { commentApi, postApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const COMMENTS_PAGE_SIZE = 100;

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
        pageSize: COMMENTS_PAGE_SIZE,
    });

    const comments = useMemo(() => data?.pages.flatMap((p) => p) ?? [], [data]);

    useEffect(() => {
        if (!highlightComment) return;
        const run = () => {
            const el = document.getElementById(`comment-${highlightComment.inReplyTo}`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const t = window.setTimeout(() => resetHighlightComment(), 1000);
            return () => window.clearTimeout(t);
        };
        const r = requestAnimationFrame(() => run());
        return () => cancelAnimationFrame(r);
    }, [highlightComment, resetHighlightComment]);

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
                                        {itemIndex > 0 && <span className="bg-border h-px w-full" />}
                                        <CommentItem comment={item} />
                                    </Fragment>
                                ))}
                            </Fragment>
                        ))}
                    {(isLoading || isFetchingNextPage) && <Loader className="mx-auto size-10" />}
                    {!isFetchingNextPage && <div ref={ref} />}

                    <TextareaEditorComment post={post} hasNextPage={hasNextPage} />
                </div>
                <CommentMoreSheet />
            </MainContent>
        </Page>
    );
}
