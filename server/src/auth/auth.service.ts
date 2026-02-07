import * as bcryptjs from 'bcryptjs';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const accessToken = this.generateToken(user);
    return { accessToken, user };
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcryptjs.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    const accessToken = this.generateToken(user);

    return { accessToken, user };
  }

  async getMyData(authorizationHeader: string) {
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }

    const user = this.jwtService.verify<JwtPayload>(token);

    const userData = await this.usersService.getUserByEmail(user.email);
    return userData;
  }

  private generateToken(user: User) {
    const { id, email, roles } = user;
    const payload = { id, email, roles };

    return this.jwtService.sign(payload);
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
    }

    const passwordEquals = await bcryptjs.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
  }
}
