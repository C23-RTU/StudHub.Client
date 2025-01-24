export interface IComment {
    id: number;
    content: string;
    personId: number;
    parentId: number;
    postId: number;
    createdAt: Date;
    deletedAt: Date;
}
