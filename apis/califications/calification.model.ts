import {z} from 'zod';

export const CalificationSchema = z.object({
    comment: z.string().min(3).max(500),
    stars: z.number().min(1).max(5),
    profileId: z.number().min(1),
})
