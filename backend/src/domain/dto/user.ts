import { createZodDto } from 'nestjs-zod/dto';

import { z } from 'zod';
import { Role } from '../role';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  verified: z.number(),
  email: z.string(),
  role: z.enum([Role.ADMIN, Role.USER]),
  createdAt: z.date(),
  password: z.string(),
});

export class UserDto extends createZodDto(userSchema) {}

export const createUserDtoSchema = userSchema.pick({
  name: true,
  email: true,
  role: true,
  verified: true,
  password: true,
});

export class CreatUserDto extends createZodDto(createUserDtoSchema) {}
