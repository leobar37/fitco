import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});


export class LoginDto extends createZodDto(loginSchema) {}
