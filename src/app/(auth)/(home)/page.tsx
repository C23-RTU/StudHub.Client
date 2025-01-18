import type { Metadata } from 'next';

// import { api } from '@/api/api';

import Home from './Home';

// import type { Post } from '@/lib/types/post';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

// const posts: Array<Post> = await api.get('/posts').then((res) => res.data);

export default async function HomePage() {
    return <Home />;
}
