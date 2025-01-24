'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem';
import { TextareaEditorComment } from '@/components/CommentComponents/TextareaEditorComment';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import type { Post } from '@/lib/types/post';
import { CommentService } from '@/services/comment.service';

export function Comments({ post }: { post: Post }) {
    const router = useRouter();
    const [postState, updatePostState] = useState(post);

    const { data, isLoading } = useQuery({
        queryKey: ['fetch-post-comments', post.id],
        queryFn: async () => await CommentService.getByPostId(post.id),
    });

    return (
        <div className="page">
            <Header className="justify-start gap-4">
                <BackButton onClick={() => router.back()} />
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard post={postState} />
                <div className="flex flex-col gap-4 pb-[56px]">
                    {isLoading &&
                        Array(3)
                            .fill(0)
                            .map((_, index) => <Skeleton key={index} className="h-[50px] w-full" />)}

                    {!isLoading &&
                        data?.map((item, index) => (
                            <Fragment key={item.id}>
                                {index > 0 && <span className="h-[1px] bg-secondary w-3/5 mx-auto" />}
                                <CommentItem comment={item} />
                            </Fragment>
                        ))}

                    <TextareaEditorComment postId={post.id} updatePost={updatePostState} />
                </div>
            </MainContent>
        </div>
    );
}
