'use client';

import { Fragment, useEffect, useMemo } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem';
import { CommentMoreSheet } from '@/components/CommentComponents/CommentMoreSheet';
import { TextareaEditorComment } from '@/components/CommentComponents/TextareaEditorComment';
import { useCommentStore } from '@/components/CommentComponents/store/useComment.store';
import { SkeletonList } from '@/components/ui/skeleton';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';

import { commentApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client';

const COMMENTS_PAGE_SIZE = 100;

export function CommentList({ post }: { post: PostDetailDTO }) {
    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage, hasNextPage },
    } = useInfinityScroll({
        queryKey: ['fetch-post-comments', post.id],
        queryFn: async ({ pageParam }) => (await commentApi.commentsGetByPostId(post.id, 0, pageParam, 100)).data,
        pageSize: COMMENTS_PAGE_SIZE,
    });

    const comments = useMemo(() => data?.pages.flatMap((p) => p) ?? [], [data]);

    const highlightComment = useCommentStore((store) => store.highlightComment);
    const resetHighlightComment = useCommentStore((store) => store.resetHighlightComment);

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

    if (isLoading) return <SkeletonList count={3} />;

    return (
        <>
            <div className="flex flex-col pb-[56px]">
                {comments && comments.length === 0 && <p className="m-auto">Комментариев нет</p>}

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
                {isFetchingNextPage && <SkeletonList />}
                {!isFetchingNextPage && <div ref={ref} />}

                <TextareaEditorComment post={post} hasNextPage={hasNextPage} />
            </div>
            <CommentMoreSheet />
        </>
    );
}
