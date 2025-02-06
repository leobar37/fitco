import { User } from '@prisma/client';
import { Request } from 'express';
export type TRequestContext = {
  _req: Request;
  user: User;
};
export class RequestContext {
  _req: Request;
  _user: User;
  constructor(opts: TRequestContext) {
    this._req = opts._req;
    this._user = opts.user;
  }

  getRequest(): Request {
    return this._req;
  }
  getUser(): User {
    return this._user;
  }
}

