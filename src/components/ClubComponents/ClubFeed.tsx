import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { postApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { MainContent } from '@/hoc/MainContent/MainContent';

export function ClubFeed() {
    const { id } = useParams();
    const clubId = Number(id);

    const { data, isLoading } = useQuery({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: async () => (await postApi.postsGetByClubId(clubId)).data,
    });

    return (
        <MainContent>
            <p className="text-xl font-semibold">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {isLoading ? (
                    <p className="m-auto">Загрузка постов...</p>
                ) : data && data.length > 0 ? (
                    data.map((post: PostDetailDTO) => <PostCard key={post.id} post={post} />)
                ) : !data ? (
                    <p className="m-auto">Ошибка загрузки постов</p>
                ) : (
                    <p className="m-auto">Нет постов</p>
                )}
            </div>
        </MainContent>
    );
}
