'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';

import { useCommentStore } from '@/components/CommentComponents/store/useComment.store';
import Loader from '@/components/Loader';
import { Page } from '@/components/Page';
import { BackButton } from '@/components/ui/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { commentApi, postApi } from '@/api/api';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

const PostCardDynamic = dynamic(() => import('@/components/PostCard/PostCard').then((mod) => mod.PostCard), {
    loading: () => <Skeleton className="h-[505px] rounded-none" />,
});
const CommentItemDynamic = dynamic(
    () => import('@/components/CommentComponents/CommentItem').then((mod) => mod.CommentItem),
    {
        loading: () => <Skeleton className="h-[85px]" />,
    }
);
const CommentMoreSheetDynamic = dynamic(
    () => import('@/components/CommentComponents/CommentMoreSheet').then((mod) => mod.CommentMoreSheet),
    {
        loading: () => <></>,
    }
);
const TextareaEditorCommentDynamic = dynamic(
    () => import('@/components/CommentComponents/TextareaEditorComment').then((mod) => mod.TextareaEditorComment),
    {
        loading: () => <></>,
    }
);

export function Comments({ postId }: { postId: number }) {
    const router = useRouter();

    const highlightComment = useCommentStore((store) => store.highlightComment);
    const resetHighlightComment = useCommentStore((store) => store.resetHighlightComment);

    const { data: post, isLoading: isLoadingPost } = useQuery({
        queryKey: ['fetch-post', postId],
        queryFn: async () => (await postApi.postsGetById(postId)).data,
    });

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-post-comments', postId],
        queryFn: async ({ pageParam }) => (await commentApi.commentsGetByPostId(postId, 0, pageParam, 100)).data,
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
                {isLoading && <Skeleton className="h-[505px] rounded-none" />}
                {!isLoadingPost && post && <PostCardDynamic post={post} />}
                <div className="flex flex-col gap-4 pb-[56px]">
                    {data?.pages && data?.pages.length === 0 && <p className="m-auto">Комментариев нет</p>}

                    {!isLoading &&
                        data?.pages?.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page.map((item, itemIndex) => (
                                    <Fragment key={item.id}>
                                        {itemIndex > 0 && <span className="bg-border h-px w-full" />}
                                        <CommentItemDynamic comment={item} />
                                    </Fragment>
                                ))}
                            </Fragment>
                        ))}
                    {(isLoading || isFetchingNextPage) && <Loader className="size-10" />}
                    {!isFetchingNextPage && <div ref={ref} />}

                    {post && <TextareaEditorCommentDynamic post={post} hasNextPage={hasNextPage} />}
                </div>
                <CommentMoreSheetDynamic />
            </MainContent>
        </Page>
    );
}
