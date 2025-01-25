import { z } from 'zod';

export interface IComment {
    id: number;
    content: string;
    personId: number;
    parentId: number;
    postId: number;
    createdAt: Date;
    deletedAt: Date;
}

export const CommentPayloadSchema = z.object({
    content: z.string().nonempty(),
    parentId: z.number().nullable(),
    personId: z.number(),
    postId: z.number(),
});

export type TCommentPayloadSchema = z.infer<typeof CommentPayloadSchema>;
