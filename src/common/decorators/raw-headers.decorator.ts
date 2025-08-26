/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext): string[] => {
    const request = ctx.switchToHttp().getRequest();
    const rawHeaders = request.rawHeaders;

    return rawHeaders;
  },
);
