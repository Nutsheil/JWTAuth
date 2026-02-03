import { Role } from 'src/roles/roles.model';

export interface JwtPayload {
  id: number;
  email: string;
  roles: Role[];
}
