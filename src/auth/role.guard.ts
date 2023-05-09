import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(user)
   // return user.role === requiredRole; 

    return user.roles.some((role: string) => role === requiredRole);
  }
}
