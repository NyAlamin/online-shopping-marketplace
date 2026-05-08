import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // No roles defined on route = allow all authenticated users
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // comes from JwtStrategy.validate()

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied: Managers only');
    }

    return true;
  }
}
