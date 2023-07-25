import {z} from 'zod';

export const CareerSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(10).nullable(),
    labelId: z.number(),
})
