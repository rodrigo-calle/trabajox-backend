import {z} from 'zod';

export const ProfileSchema = z.object({
    bio: z.string().min(10).max(300),
    avatar: z.string().url().nullable(),
    userId: z.number().min(1)
})
