import { JwtPayload } from './jwt-payload.interface';

export interface RequestWithUser {
  user: JwtPayload;
}
