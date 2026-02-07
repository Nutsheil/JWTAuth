import { createContext } from 'react';
import type { User } from '../../../entities/user';
import type { LoginDto, RegisterDto } from '../../../features/auth';

export type AuthContextValue = {
  user: User | null;
  isAuth: boolean;

  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
