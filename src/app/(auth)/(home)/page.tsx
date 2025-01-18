import type { Metadata } from 'next';

import Home from './Home';
import { PostService } from '@/services/post.service';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export const dynamic = 'force-static';
export const revalidate = 100;

export default async function HomePage() {
    const posts = await PostService.getAll();

    return <Home posts={posts} />;
}
