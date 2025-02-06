import { Controller, Get, Post } from '@nestjs/common';

@Controller('products')
export class ProductControllers {
  @Get("")
  findAll() {

  }

  @Post()
  create(){
    
  }
}
