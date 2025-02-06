import { Request } from 'express';
import { UserDto } from '@/domain/entities/user';
export type TRequestContext = {
  _req: Request;
  user: UserDto;
};
export class RequestContext {
  _req: Request;
  _user: UserDto;
  constructor(opts: TRequestContext) {
    this._req = opts._req;
    this._user = opts.user;
  }

  getRequest(): Request {
    return this._req;
  }
  getUser(): UserDto {
    return this._user;
  }
}

export const REQUEST_CONTEXT_KEY ="__request_context"