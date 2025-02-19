import { create } from 'zustand/react';

import type { TCommentPayloadSchema } from '@/lib/types/comment.type';

interface IUseCommentStore {
    commentPayload: TCommentPayloadSchema;
    setCommentPayload: (payload: TCommentPayloadSchema) => void;
    resetCommentPayload: () => void;
}

export const useCommentStore = create<IUseCommentStore>((set) => ({
    commentPayload: {
        content: '',
        parentId: null,
        postId: -1,
    },
    setCommentPayload: (payload) => {
        set({
            commentPayload: payload,
        });
    },
    resetCommentPayload: () => {
        set({
            commentPayload: {
                content: '',
                parentId: null,
                postId: -1,
            },
        });
    },
}));
