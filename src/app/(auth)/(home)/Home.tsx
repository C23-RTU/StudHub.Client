import { EventCard } from '@/components/EventCard/EventCard';
import { Header, HeaderTitle } from '@/components/Header/Header';
import { NotificationBadge } from '@/components/NotificationBadge/NotificationBadge';
import { PostCard } from '@/components/PostCard/PostCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import type { Post } from '@/lib/types/post';

export default async function Home() {
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
    return (
        <div className="page">
            <div className="flex flex-col gap-4">
                <Header>
                    <HeaderTitle>Доброе утро, Костя 👋</HeaderTitle>
                    <NotificationBadge />
                </Header>

                <div className="flex justify-center">
                    <EventCard />
                </div>
                <p className="text-xl font-semibold">Лента</p>
                <div>
                    <SearchInput placeholder="Поиск по ленте..." />
                </div>
                <div className="flex flex-col gap-10">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
