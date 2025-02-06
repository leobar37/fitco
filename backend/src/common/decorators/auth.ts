import { Role } from '@/domain';
import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { AUTH_KEY } from '../constants';
import { negate, isNil } from 'lodash';

export const Auth = (role?: Role) =>
  SetMetadata(AUTH_KEY, [role, AUTH_KEY].filter(negate(isNil)));
