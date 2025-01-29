import { api } from '@/api/api';

import type { Post } from '@/lib/types/post';
import { getServerSideCookies } from '@/server-actions/getServerSideCookies';

class postService {
    async getAll(): Promise<Post[]> {
        return (await api.get('/posts')).data;
    }

    async getById(postId: number): Promise<Post> {
        // Если делаем запрос на серверной стороне, то клиентские куки не подтягиваются по умолчанию к запросу,
        // поэтому получаем их вручную и выставляем в headers
        // Такая логика не ломаем запрос на клиентское стороне, т.к куки на клиенте мы выставлять не может, так что они просто проигнорятся
        const { Cookie } = await getServerSideCookies();

        return (
            await api.get(`/posts/${postId}`, {
                headers: {
                    Cookie,
                },
            })
        ).data;
    }
}
export const PostService = new postService();
