import { create } from 'zustand/react';

import type { CommentDetailDTO } from '@/api/axios-client';

interface IUseCommentStore {
    commentForReply: CommentDetailDTO | null;
    highlightComment: CommentDetailDTO | null;
    commentMoreSheet: CommentDetailDTO | null;
    openCommentMoreSheet: (commentMoreSheet: CommentDetailDTO) => void;
    closeCommentMoreSheet: () => void;
    setCommentForReply: (commentForReply: CommentDetailDTO) => void;
    setHighlightComment: (highlightComment: CommentDetailDTO) => void;
    resetCommentForReply: () => void;
    resetHighlightComment: () => void;
}

export const useCommentStore = create<IUseCommentStore>((set) => ({
    commentForReply: null,
    highlightComment: null,
    commentMoreSheet: null,
    openCommentMoreSheet: (commentMoreSheet) => {
        set({
            commentMoreSheet,
        });
    },
    closeCommentMoreSheet: () => {
        set({ commentMoreSheet: null });
    },
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
