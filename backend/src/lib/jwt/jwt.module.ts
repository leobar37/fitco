import { Module, Global } from '@nestjs/common';
import { JwtModule as InternalJwtModule } from '@nestjs/jwt';

const MODULE = InternalJwtModule.register({
  secret: 'my-custom-secret',
  signOptions: {
    expiresIn: '1d',
  },
});

@Global()
@Module({
  imports: [MODULE],
  providers: [],
  controllers: [],
  exports: [MODULE],
})
export class JwtModule {}