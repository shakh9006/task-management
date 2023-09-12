import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';
import * as process from 'process';
import { TokenService } from '../../modules/token/token.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Unauthorized',
        });
      }
      const user = this.tokenService.verify(token);
      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role.name));
    } catch (e) {
      console.log(e);
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }
}
