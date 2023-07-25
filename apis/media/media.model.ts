import { z } from 'zod';

export const MediaSchema = z.object({
    mediaUrl: z.string().url(),
    postId: z.number().int().positive().nonnegative(),
});
