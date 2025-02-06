import { CreateProductDto } from '@/domain/dto/product';
import { PrismaService } from '@/lib/prisma';
import { Injectable } from '@nestjs/common';
import { RequestContext } from '@/common/context';
@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  
  findAll(ctx: RequestContext) {
    return this.prismaService.product.findMany({
      where: {
        userId: ctx.getUser().id,
        deletedAt: null,
      },
    });
  }
  create(ctx: RequestContext, dto: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        description: dto.description,
        name: dto.description,
        price: dto.price,
        stock: dto.stock,
        userId: ctx.getUser().id,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
