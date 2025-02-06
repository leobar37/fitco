import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_CONTEXT_KEY } from '../constants';
import { parseContext } from '../context/parse-context';

export const Ctx = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { req } = parseContext(ctx);
    return req[REQUEST_CONTEXT_KEY];
  },
);
