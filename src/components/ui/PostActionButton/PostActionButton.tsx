'use client';

import { usePathname, useRouter } from 'next/navigation';
import { match } from 'path-to-regexp';
import { useMemo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdOutlineModeComment } from 'react-icons/md';

import { AUTH_PAGE } from '@/lib/config/routes.config';

import type { PostDetailDTO } from '@/api/axios-client';

import { usePostReaction } from './usePostReaction';
import { cn } from '@/lib/utils/utils';

interface Props {
    type: 'like' | 'comment';
    post: PostDetailDTO;
}

const ICON_SIZE = 20;

export function ActionButton({ type, post }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const { mutate: reactionHandler } = usePostReaction(post);

    const computedIcon = useMemo(() => {
        switch (type) {
            case 'like':
                return post.isUserReacted ? (
                    <FaHeart size={ICON_SIZE} />
                ) : (
                    <FaRegHeart className="text-neutral-500" size={ICON_SIZE} />
                );
            case 'comment':
                return <MdOutlineModeComment className="text-neutral-500" size={ICON_SIZE} />;
        }
    }, [type, post.isUserReacted]);

    const isCommentType = useMemo(() => {
        return type === 'comment';
    }, [type]);

    const clickHandler = () => {
        if (type === 'like') reactionHandler();
        if (type === 'comment') router.push(AUTH_PAGE.POST_COMMENTS(post.id));
    };

    return (
        <div
            className={cn('flex cursor-pointer items-center gap-2 rounded-md p-1 select-none', {
                'text-blue': isCommentType ? !!match(AUTH_PAGE.POST_COMMENTS(post.id))(pathname) : false,
            })}
            data-testid={type}
            onClick={clickHandler}
        >
            {computedIcon}
            <p className="text-xs font-medium">{isCommentType ? post.commentCount : post.reactionCount}</p>
        </div>
    );
}
