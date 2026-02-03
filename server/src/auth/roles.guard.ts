import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest<
        RequestWithUser & {
          headers?: { authorization?: string };
        }
      >();

      const authHeader = req.headers?.authorization;
      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }

      const user = this.jwtService.verify<JwtPayload>(token);
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
