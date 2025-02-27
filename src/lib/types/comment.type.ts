import { z } from 'zod';

export const CommentPayloadSchema = z.object({
    content: z.string().nonempty(),
    inReplyTo: z.number().nullable(),
    postId: z.number().nullable(),
});

export type TCommentPayloadSchema = z.infer<typeof CommentPayloadSchema>;
