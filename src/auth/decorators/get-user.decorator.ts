/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/users/models/user.model';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Partial<User> => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user)
      throw new InternalServerErrorException('User not found  (request)');

    return !data ? user : user[data];
  },
);
