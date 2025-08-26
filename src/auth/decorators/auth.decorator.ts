import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../types';
import { RoleProtected } from '.';
import { UserRoleGuard } from '../guards';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
