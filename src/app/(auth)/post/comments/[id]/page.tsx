import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Comments } from './Comments';

export const metadata: Metadata = {
    title: 'Комментарии',
    description: 'Комментарии',
};

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
    const postId = (await params).id;

    try {
        return <Comments postId={postId} />;
    } catch {
        return notFound();
    }
};

export default Page;
