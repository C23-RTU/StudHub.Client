'use client';

import { SendHorizonalIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { CommentItem } from '@/components/CommentComponents/CommentItem/CommentItem';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton/BackButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import type { IComment } from '@/lib/types/comment.type';
import type { Post } from '@/lib/types/post';

export function Comments({ post, comments }: { post: Post; comments: IComment[] }) {
    const router = useRouter();

    return (
        <div className="page">
            <Header className="justify-start gap-4">
                <BackButton onClick={() => router.back()} />
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard post={post} />
                <div className="flex flex-col gap-4 pb-[56px]">
                    {!!comments.length &&
                        comments.map((item, index) => (
                            <Fragment key={index}>
                                {index > 0 && <span className="h-[1px] bg-secondary w-3/5 mx-auto" />}
                                <CommentItem comment={item} />
                            </Fragment>
                        ))}

                    <div className="fixed left-0 right-0 bottom-0 flex gap-1 bg-bg items-center px-2 shadow-2xl shadow-black">
                        <Textarea
                            rows={2}
                            className="resize-none focus-visible:ring-inset focus-visible:ring-0 text-sm h-auto border-none shadow-none"
                            placeholder="Комментарий"
                        />
                        <Button className="h-[40px] w-[40px] rounded-full ">
                            <SendHorizonalIcon />
                        </Button>
                    </div>
                </div>
            </MainContent>
        </div>
    );
}
