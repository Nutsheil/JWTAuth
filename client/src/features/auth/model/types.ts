import type { User } from '../../../entities/user';

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name?: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
