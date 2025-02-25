'use client'

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { postApi } from '@/api/api';
import type { PostDetailDTO } from '@/api/axios-client/models';

import { PostCard } from '../PostCard/PostCard';
import { SearchInput } from '../ui/SearchInput/SearchInput';

import { MainContent } from '@/hoc/MainContent/MainContent';
import { PostLoader } from '../ui/PostLoader/PostLoader';

export function ClubFeed() {
    const { id } = useParams();
    const clubId = Number(id);

    const { data: posts, isLoading } = useQuery({
        queryKey: ['fetch-club-posts', clubId],
        queryFn: async () => (await postApi.postsGetByClubId(clubId)).data,
    });

    return (
        <MainContent>
            <p className="text-xl font-semibold">Посты</p>
            <SearchInput placeholder="Поиск по постам..." />

            <div className="flex flex-col gap-10">
                {isLoading ? (
                    <PostLoader isLoading={isLoading} posts={posts} amount={1} />
                ) : posts && posts.length > 0 ? (
                    posts.map((post: PostDetailDTO) => <PostCard key={post.id} post={post} />)
                ) : !posts ? (
                    <p className="m-auto">Ошибка загрузки постов</p>
                ) : (
                    <p className="m-auto">Нет постов</p>
                )}
            </div>
        </MainContent>
    );
}
