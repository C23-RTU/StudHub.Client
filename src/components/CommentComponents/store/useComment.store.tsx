import { create } from 'zustand/react';

import type { CommentDetailDTO } from '@/api/axios-client';

interface IUseCommentStore {
    commentForReply: CommentDetailDTO | null;
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
