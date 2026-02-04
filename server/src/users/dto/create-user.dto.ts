import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Адрес электронной почты' })
  @IsString({ message: 'Должен быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 символов' })
  readonly password: string;

  @ApiProperty({ example: 'User', description: 'Имя пользователя' })
  readonly name?: string;
}
