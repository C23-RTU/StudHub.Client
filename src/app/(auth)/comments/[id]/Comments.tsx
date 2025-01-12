import { Fragment } from 'react';

import { CommentItem } from '@/components/CommentItem/CommentItem';
import { PostCard } from '@/components/PostCard/PostCard';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Comments() {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                <PostCard
                    post={{
                        id: 1,
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula eu nibh at suscipit.
                                  Maecenas consectetur vestibulum felis ut pharetra. Donec finibus vestibulum rhoncus. Nullam leo
                                  velit, imperdiet et efficitur non, gravida ac mi. Pellentesque vitae posuere ante. Etiam eu aliquet
                                  purus. Nulla eget volutpat lorem. In hac habitasse platea dictumst.`,
                        createdAt: new Date(),
                        user: {
                            id: 1,
                            name: 'Станислав Алексеевич Кудж',
                            major: 'Ректор РТУ МИРЭА',
                            avatarUrl: '/img/avatar.png',
                            status: 'online',
                        },
                        likesCount: 10,
                        commentsCount: 5,
                        tags: ['РТУ', 'Сетка'],
                    }}
                />
                <div className="flex flex-col gap-4">
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <Fragment key={index}>
                                {index > 0 && <span className="h-[1px] bg-secondary w-3/5 mx-auto" />}
                                <CommentItem />
                            </Fragment>
                        ))}
                </div>
            </MainContent>
        </div>
    );
}
