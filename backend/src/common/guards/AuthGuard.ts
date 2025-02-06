import { PrismaService } from '@/lib/prisma/prisma.module';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isEmpty, uniq } from 'lodash';
import { parseContext } from '../context';
export const AUTH_KEY = 'auth';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { req } = parseContext(context);

    const authCodeAndRoles = uniq(
      this.reflector.getAllAndMerge(AUTH_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) as string[],
    );

    if (isEmpty(authCodeAndRoles)) {
      return true;
    }
    const authorization = req.headers?.authorization;

    if (!authorization) {
      return true;
    }

    const token = authorization.replace('Bearer ', '');

    const isValid = this.jwtService.verify(token);

    if (!isValid) {
      throw new UnauthorizedException('TOKEN_INVALID');
    }

    return true;
  }
}
