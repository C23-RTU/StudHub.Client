import { Fragment } from 'react';

import { CommentItem } from '@/components/CommentItem/CommentItem';

// import { PostCard } from '@/components/PostCard/PostCard';

import { Header, HeaderTitle } from '@/hoc/Header/Header';
import { MainContent } from '@/hoc/MainContent/MainContent';

export function Comments() {
    return (
        <div className="page">
            <Header>
                <HeaderTitle>Комментарии</HeaderTitle>
            </Header>

            <MainContent>
                {/* <PostCard post={{}} /> */}
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
