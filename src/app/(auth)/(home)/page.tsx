import type { Metadata } from 'next';

import Home from './Home';
import type { Post } from '@/lib/types/post';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

const posts: Array<Post> = [
    {
        id: 1,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu nibh at suscipit.
                    Maecenas consectetur vestibulum felis ut pharetra. Donec finibus vestibulum rhoncus. Nullam leo
                    velit, imperdiet et efficitur non, gravida ac mi. Pellentesque vitae posuere ante. Etiam eu aliquet
                    purus. Nulla eget volutpat lorem. In hac habitasse platea dictumst.`,
        createdAt: new Date(),
        user: {
            id: 1,
            name: 'Станислав Алексеевич Кудж',
            major: 'Ректор РТУ МИРЭА',
            avatarUrl: '/img/avatar.png',
            status: 'online',
        },
        likesCount: 10,
        commentsCount: 5,
        tags: ['РТУ', 'Сетка'],
    },
];

export default async function HomePage() {
    return <Home posts={posts} />;
}
