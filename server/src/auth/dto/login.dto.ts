import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Адрес электронной почты' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  password: string;
}
