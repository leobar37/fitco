import { RequestContext } from '@/common/context';
import { Auth } from '@/common/decorators/auth';
import { Role } from '@/domain';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Ctx } from '../common/decorators/ctx';
import { ProductService } from '../services/product.service';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  @Auth()
  findAll(@Ctx() ctx: RequestContext) {
    console.log('user', ctx.getUser());
    return this.productService.findAll(ctx);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
