import { z } from 'zod';

export const PostSchema = z.object({
    name:        z.string().min(3).max(100),
    description: z.string().min(10).max(300).nullable(),
    likes:       z.number().default(0),
    profileId:   z.number().min(1),
})
