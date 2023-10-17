import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  isWorker: z.boolean(),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const RevokeRefreshTokensSchema = z.object({
  userId: z.string().min(1),
});
