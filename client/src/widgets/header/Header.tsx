import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthModal } from '../../features/auth';
import { useAuthContext } from '../../shared/hooks/useAuthContext';

export const Header = () => {
  const { isAuth, logout } = useAuthContext();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JWT Demo
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>

          {isAuth && (
            <>
              <Button color="inherit" component={Link} to="/users">
                Пользователи
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Профиль
              </Button>
              <Button color="inherit" onClick={logout}>
                Выйти
              </Button>
            </>
          )}

          {!isAuth && (
            <Button color="inherit" onClick={() => setIsAuthModalOpen(true)}>
              Войти
            </Button>
          )}
        </Stack>
      </Toolbar>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </AppBar>
  );
};
