import { z } from 'zod';

export const ContactSchema = z.object({
    phone: z.string().min(9).max(9).nullable(),
    whatsapp: z.string().min(9).max(9).nullable(),
    instagram: z.string().min(3).max(50).nullable(),
    facebook: z.string().min(3).max(50).nullable(),
    pinterst: z.string().min(3).max(50).nullable(),
    profileId: z.number().int().positive().nonnegative(),
})