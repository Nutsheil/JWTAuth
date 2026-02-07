import { api } from '../../../shared/api/api';
import type { User } from '../../../entities/user';
import type { AuthResponse, LoginDto, RegisterDto } from './types';

class AuthService {
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/registration', data);
    return response.data;
  }

  async getMe(token: string): Promise<User> {
    const response = await api.get<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export const authService = new AuthService();
