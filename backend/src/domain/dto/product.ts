import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
});

export class ProductDto extends createZodDto(productSchema) {}

export const createProductSchema = productSchema.pick({
  name: true,
  description: true,
  price: true,
  stock: true,
});

export class CreateProductDto extends createZodDto(createProductSchema) {}


