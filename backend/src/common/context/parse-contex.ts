import {
    ArgumentsHost,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';
import { REQUEST_CONTEXT_KEY } from './request-context';
export const parseContext = (context: ArgumentsHost | ExecutionContext) => {
  const type = context.getType();
  if (type === 'http') {
    const ctx = context.switchToHttp();
    return {
      req: ctx.getRequest(),
      reply: ctx.getResponse(),
    };
  }
  throw new InternalServerErrorException(`Unknown context type ${type}`);
};

export const getRequestContext = (
  context: ArgumentsHost | ExecutionContext,
) => {
  const ctx = parseContext(context);
  return ctx.req[REQUEST_CONTEXT_KEY];
};
