import { JWTPayload } from '@/domain';
import { UserService } from '@/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestContext } from './request-context';

@Injectable()
export class RequestContextService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}
  async fromRequest(req: Request) {
    const authorization = req.headers?.authorization ?? '';
    const token = authorization.replace('Bearer ', '');
    const isValid = this.jwtService.verify(token);
    if (!isValid) {
      throw new UnauthorizedException('TOKEN_INVALID');
    }
    const payload = this.jwtService.decode(token) as JWTPayload;
    const user = await this.userService.findOne(payload.userId);
    return new RequestContext({
      _req: req,
      user: user,
    });
  }
}
