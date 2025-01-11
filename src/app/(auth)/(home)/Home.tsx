import { EventCard } from '@/components/EventCard/EventCard';
import { Header, HeaderTitle } from '@/components/Header/Header';
import { NotificationBadge } from '@/components/NotificationBadge/NotificationBadge';
import { PostCard } from '@/components/PostCard/PostCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import type { Post } from '@/lib/types/post';

export default async function Home({ posts }: { posts: Post[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Доброе утро, Костя 👋</HeaderTitle>
                <NotificationBadge />
            </Header>

            <main className="flex flex-col gap-4">
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
            </main>
        </div>
    );
}
