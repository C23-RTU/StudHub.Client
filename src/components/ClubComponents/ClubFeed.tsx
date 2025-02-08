// import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { MainContent } from '@/hoc/MainContent/MainContent';

export function ClubFeed() {
    // const [posts, setPosts] = useState<Post[] | null>(null);

    return (
        <MainContent>
            <p className="text-xl font-semibold">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {/* {posts ? (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="m-auto">Нет постов</p>
                )} */}
            </div>
        </MainContent>
    );
}
