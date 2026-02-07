// auth/dto/auth-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp' })
  accessToken: string;

  @ApiProperty({ example: { id: 1, name: 'name', email: 'email@email.com' } })
  user: User;
}
