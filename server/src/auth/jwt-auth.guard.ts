import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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

    try {
      const user = this.jwtService.verify<JwtPayload>(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }
}
