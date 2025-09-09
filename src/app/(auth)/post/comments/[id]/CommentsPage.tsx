import { Page } from '@/components/Page';
import { PostCard } from '@/components/PostCard/PostCard';
import { BackButton } from '@/components/ui/BackButton';

import type { PostDetailDTO } from '@/api/axios-client/models/post-detail-dto';

import { CommentList } from './CommentList';
import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function CommentsPage({ post }: { post: PostDetailDTO }) {
    console.log('123');
    return (
        <Page className="p-0">
            <Header className="py-[12px]">
                <BackButton variant={'ghost'} />
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard post={post} />
                <CommentList post={post} />
            </MainContent>
        </Page>
    );
}
