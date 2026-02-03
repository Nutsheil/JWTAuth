import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  readonly userId: number;
}
