import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permission } from 'process';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector:Reflector){};

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const  [req] = context.getArgs();
    const userPermissions = req?.headers?.permissions||[];
    const requiredPermissions = this.reflector.get('permissions',context.getHandler())||[]
    console.log(requiredPermissions)
    console.log(userPermissions)
    const hasAllRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    if(requiredPermissions.length ===0 || hasAllRequiredPermissions)
      return true;
    throw new ForbiddenException('Insuficientes permisos')
  }
}



