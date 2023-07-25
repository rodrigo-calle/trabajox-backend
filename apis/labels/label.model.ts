import {z} from 'zod';

export const LabelSchema = z.object({
    name: z.string().min(3).max(100),
    background: z.string().length(7).default('#ffffff'),
})
