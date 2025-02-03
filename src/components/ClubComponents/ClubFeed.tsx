import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { MainContent } from '@/hoc/MainContent/MainContent';
import type { Post } from '@/lib/types/post';
import { PostService } from '@/services/post.service';

export function ClubFeed() {
    const { clubId } = useParams();

    const { data: posts, isLoading } = useQuery({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: () => PostService.getByClubId(Number(clubId)),
        enabled: !isNaN(Number(clubId)),
    });

    return (
        <MainContent>
            <p className="text-xl font-semibold">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {isLoading ? (
                    <p className="m-auto">Загрузка постов...</p>
                ) : posts && posts.length > 0 ? (
                    posts.map((post: Post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="m-auto">Нет постов</p>
                )}
            </div>
        </MainContent>
    );
}
