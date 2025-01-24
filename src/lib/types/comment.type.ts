export interface IComment {
    id: number;
    content: string;
    personId: number;
    parentId: number;
    postId: number;
    createdAt: Date;
    deletedAt: Date;
}

export interface ICommentPayload {
    content: string;
    parentId: number | null;
    personId: number;
    postId: number;
}
