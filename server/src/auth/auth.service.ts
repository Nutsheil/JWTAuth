import * as bcryptjs from 'bcryptjs';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcryptjs.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const { id, email, roles } = user;
    const payload = { id, email, roles };

    return {
      accessToken: this.jwtService.sign(payload),
    };
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
