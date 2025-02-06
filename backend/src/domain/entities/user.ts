import { User } from '@prisma/client';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  price: z.number(),
  stock: z.number(),
  createdAt: z.date(),
});

export class UserDto extends createZodDto(userSchema) {}
