import { Injectable, OnModuleInit, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPaginator } from 'prisma-extension-pagination';

const paginate = createPaginator({
  pages: {
    limit: 10,
    includePageCount: true,
  },
});
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  get custom() {
    return this.$extends({
      model: {
        product: {
          paginate,
        },
      },
    });
  }
}

@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
