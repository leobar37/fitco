import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextService } from './common/context/request-context.service';
import { AuthGuard } from './common/guards/AuthGuard';
import { AuthController, ProductController } from './controllers';
import { JwtModule } from './lib/jwt/jwt.module';
import { PrismaModule } from './lib/prisma/prisma.module';
import { ProductService, UserService } from './services';
import { AuthService } from './services/auth.service';
@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [
    AppController,
    AppController,
    ProductController,
    AuthController,
  ],
  providers: [
    AppService,
    RequestContextService,
    ProductService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AppModule {}
