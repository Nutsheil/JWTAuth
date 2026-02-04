import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @IsString({ message: 'Название роли должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNumber({}, { message: 'Идентификатор пользователя должен быть числом' })
  readonly userId: number;
}
