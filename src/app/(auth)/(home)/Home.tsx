'use client';

import { EventCard } from '@/components/EventCard/EventCard';
import { Header, HeaderTitle } from '@/components/Header/Header';
import { NotificationBadge } from '@/components/NotificationBadge/NotificationBadge';
import { PostCard } from '@/components/PostCard/PostCard';
import { SearchInput } from '@/components/ui/SearchInput/SearchInput';

const Home = () => {
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
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        </div>
    );
};

export default Home;
