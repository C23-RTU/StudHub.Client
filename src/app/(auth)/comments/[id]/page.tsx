import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Comments } from './Comments';
import type { IComment } from '@/lib/types/comment.type';
import type { Post } from '@/lib/types/post';
import { CommentService } from '@/services/comment.service';
import { PostService } from '@/services/post.service';

export const metadata: Metadata = {
    title: 'Комментарии',
    description: 'Комментарии',
};

export const dynamic = 'force-static';
export const revalidate = 60;

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
    const postId = (await params).id;

    try {
        const [post, comments]: [Post, IComment[]] = await Promise.all([
            PostService.getById(postId),
            CommentService.getByPostId(postId),
        ]);

        return <Comments post={post} comments={comments} />;
    } catch {
        return notFound();
    }
};

export default Page;
