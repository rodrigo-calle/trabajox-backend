import {z} from 'zod';

export const UserSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    isWorker: z.boolean()
})
