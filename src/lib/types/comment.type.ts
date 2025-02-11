import { z } from 'zod';

export const CommentPayloadSchema = z.object({
    content: z.string().nonempty(),
    parentId: z.number().nullable(),
    postId: z.number(),
});

export type TCommentPayloadSchema = z.infer<typeof CommentPayloadSchema>;
