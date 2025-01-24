import { useState } from 'react';

import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { MainContent } from '@/hoc/MainContent/MainContent';
import type { Post } from '@/lib/types/post';

export function ClubFeed() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [posts, setPosts] = useState<Post[] | null>(null);

    return (
        <MainContent>
            <p className="text-xl font-semibold">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {posts ? (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="m-auto">Нет постов</p>
                )}
            </div>
        </MainContent>
    );
}
