import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Comments } from './Comments';
import { PostService } from '@/services/post.service';

export const metadata: Metadata = {
    title: 'Комментарии',
    description: 'Комментарии',
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
    const postId = (await params).id;

    try {
        const post = await PostService.getById(postId);
        return <Comments post={post} />;
    } catch {
        return notFound();
    }
};

export default Page;
