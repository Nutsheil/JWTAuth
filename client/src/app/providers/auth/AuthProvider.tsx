import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../../../entities/user';
import { authService, type LoginDto, type RegisterDto } from '../../../features/auth';

type IAuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = (props: IAuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);

  const isAuth = Boolean(user);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return;
    }

    authService
      .getMe(token)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
      });
  }, []);

  const login = async (data: LoginDto) => {
    const response = await authService.login(data);

    setUser(response.user);

    localStorage.setItem('accessToken', response.accessToken);
  };

  const register = async (data: RegisterDto) => {
    const response = await authService.register(data);

    setUser(response.user);

    localStorage.setItem('accessToken', response.accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  const value = useMemo(
    () => ({
      user,
      isAuth,
      login,
      register,
      logout,
    }),
    [user, isAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
