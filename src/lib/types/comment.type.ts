import { z } from 'zod';

import type { IUser } from './user.type';

export interface IComment {
    id: number;
    content: string;
    parentId: number;
    postId: number;
    personDetailDTO: IUser;
    createdAt: Date;
}

export const CommentPayloadSchema = z.object({
    content: z.string().nonempty(),
    parentId: z.number().nullable(),
    postId: z.number(),
});

export type TCommentPayloadSchema = z.infer<typeof CommentPayloadSchema>;
