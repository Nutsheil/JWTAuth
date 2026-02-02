import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Адрес электронной почты' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  readonly password: string;

  @ApiProperty({ example: 'User', description: 'Имя пользователя' })
  readonly name?: string;
}
