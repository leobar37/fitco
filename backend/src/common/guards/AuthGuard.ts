import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty, uniq } from 'lodash';
import { RequestContextService } from '../../common/context/request-context.service';
import { AUTH_KEY, REQUEST_CONTEXT_KEY } from '../constants';
import { parseContext } from '../context';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private requestContextService: RequestContextService,
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
      throw new UnauthorizedException('Invalid token');
    }

    req[REQUEST_CONTEXT_KEY] =
      await this.requestContextService.fromRequest(req);
    return true;
  }
}
