import { z } from 'zod';

export const AddressSchema = z.object({
    country: z.string().min(3).max(50),
    region: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    province: z.string().min(3).max(50),
    profileId: z.number().int().positive().nonnegative(),
});