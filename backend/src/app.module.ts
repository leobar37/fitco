import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/prisma/prisma.module';
import { RequestContextService } from './common/context/request-context.service';
import { ProductService, UserService } from './services';
import { JwtModule } from './lib/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/AuthGuard';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AppController],
  providers: [
    AppService,
    RequestContextService,
    ProductService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
