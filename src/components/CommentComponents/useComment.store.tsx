import { create } from 'zustand/react';

import type { CommentDetailDTO } from '@/api/axios-client';

// import type { TCommentPayloadSchema } from '@/lib/types/comment.type';

interface IUseCommentStore {
    // commentPayload: TCommentPayloadSchema;
    commentForReply: CommentDetailDTO | null;
    // setCommentPayload: (payload: TCommentPayloadSchema) => void;
    // resetCommentPayload: () => void;
    setCommentForReply: (commentForReply: CommentDetailDTO) => void;
    resetCommentForReply: () => void;
}

export const useCommentStore = create<IUseCommentStore>((set) => ({
    commentForReply: null,
    setCommentForReply: (commentForReply) => {
        set({
            commentForReply,
        });
    },
    resetCommentForReply: () => {
        set({
            commentForReply: null,
        });
    },
}));
