import { z } from "zod";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  verified: z.boolean(),
  email: z.string(),
  role: z.enum([Role.ADMIN, Role.USER]),
  createdAt: z.date(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
