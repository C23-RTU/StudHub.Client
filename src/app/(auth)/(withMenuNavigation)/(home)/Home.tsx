import { NotificationBadge } from '@/components/Badge/NotificationBadge/NotificationBadge';
import { PostCard } from '@/components/PostCard/PostCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';
import type { Post } from '@/lib/types/post';

export default async function Home({ posts }: { posts: Post[] }) {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Доброе утро, Костя 👋</HeaderTitle>
                <NotificationBadge />
            </Header>

            <MainContent>
                {/* <div className="flex justify-center">
                    <EventCard />
                </div> */}
                <p className="text-xl font-semibold">Лента</p>
                <div>
                    <SearchInput placeholder="Поиск по ленте..." />
                </div>
                <div className="flex flex-col gap-10">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </MainContent>
        </div>
    );
}
