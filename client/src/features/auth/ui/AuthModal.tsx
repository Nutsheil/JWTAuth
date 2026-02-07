import { Dialog, DialogTitle, DialogContent, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { LoginForm } from './forms/LoginForm';
import { RegistrationForm } from './forms/RegistrationForm';
import { useState } from 'react';
import { useAuthContext } from '../../../shared/hooks/useAuthContext';
import type { LoginDto, RegisterDto } from '../model/types';

interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TTab = 'login' | 'registration';

export const AuthModal = (props: IAuthModalProps) => {
  const { isOpen: open, onClose } = props;

  const { login, register } = useAuthContext();

  const [activeTab, setActiveTab] = useState<TTab>('login');

  const onTabChange = (_: unknown, value: TTab) => {
    setActiveTab(value);
  };

  const onSubmitRegistration = async (data: RegisterDto) => {
    try {
      register(data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitLogin = (data: LoginDto) => {
    try {
      login(data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Tabs value={activeTab} onChange={onTabChange} centered>
        <Tab value="login" label="Вход" />
        <Tab value="registration" label="Регистрация" />
      </Tabs>

      <DialogContent>
        {activeTab === 'login' ? (
          <LoginForm onSubmit={onSubmitLogin} />
        ) : (
          <RegistrationForm onSubmit={onSubmitRegistration} />
        )}
      </DialogContent>
    </Dialog>
  );
};
