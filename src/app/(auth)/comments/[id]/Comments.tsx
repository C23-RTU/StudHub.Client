'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem';
import { SkeletonCommentsList } from '@/components/CommentComponents/SkeletonCommentsList';
import { TextareaEditorComment } from '@/components/CommentComponents/TextareaEditorComment';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';

import type { PostDetailDTO } from '@/api/axios-client/models';

import { useInfinityComments } from './useInfinityComments';
import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Comments({ post }: { post: PostDetailDTO }) {
    const router = useRouter();
    const [postState, updatePostState] = useState(post);

    const {
        ref,
        infiniteQuery: { data, isLoading, isFetchingNextPage },
    } = useInfinityComments(post.id);

    return (
        <div className="page pt-[90px]">
            <Header className="justify-start gap-4 fixed top-0 left-0 right-0 px-pageX bg-bg py-pageY z-10 m-0 shadow">
                <BackButton onClick={() => router.back()} />
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard post={postState} />
                <div className="flex flex-col gap-4 pb-[56px]">
                    {data?.pages && data?.pages.length === 0 && <p className="m-auto">Комментариев нет</p>}
                    {isLoading && <SkeletonCommentsList />}

                    {!isLoading &&
                        data?.pages?.map((page, index) => (
                            <Fragment key={index}>
                                {page.map((item) => (
                                    <Fragment key={item.id}>
                                        {index > 0 && <span className="h-[1px] bg-secondary w-3/5 mx-auto" />}
                                        <CommentItem comment={item} />
                                    </Fragment>
                                ))}
                            </Fragment>
                        ))}
                    {isFetchingNextPage && <SkeletonCommentsList />}
                    {!isFetchingNextPage && <div ref={ref} />}

                    <TextareaEditorComment postId={post.id} updatePost={updatePostState} />
                </div>
            </MainContent>
        </div>
    );
}
