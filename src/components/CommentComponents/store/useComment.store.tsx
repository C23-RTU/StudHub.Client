import { create } from 'zustand/react';

import type { CommentDetailDTO } from '@/api/axios-client';

interface IUseCommentStore {
    commentForReply: CommentDetailDTO | null;
    highlightComment: CommentDetailDTO | null;
    setCommentForReply: (commentForReply: CommentDetailDTO) => void;
    setHighlightComment: (highlightComment: CommentDetailDTO) => void;
    resetCommentForReply: () => void;
    resetHighlightComment: () => void;
}

export const useCommentStore = create<IUseCommentStore>((set) => ({
    commentForReply: null,
    highlightComment: null,
    setCommentForReply: (commentForReply) => {
        set({
            commentForReply,
        });
    },
    setHighlightComment: (highlightComment) => {
        if (!highlightComment.inReplyTo) return;

        set({
            highlightComment,
        });
    },
    resetCommentForReply: () => {
        set({
            commentForReply: null,
        });
    },
    resetHighlightComment: () => {
        set({ highlightComment: null });
    },
}));
