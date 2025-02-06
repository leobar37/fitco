import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Ctx } from '../common/decorators/ctx';
import { RequestContext } from '@/common/context';
import { Auth } from '@/common/decorators/auth';
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  @Auth()
  findAll(@Ctx() ctx: RequestContext) {
    console.log('user', ctx.getUser());
    return this.productService.findAll(ctx)
  }

  @Post()
  @Auth()
  create() {}
}
