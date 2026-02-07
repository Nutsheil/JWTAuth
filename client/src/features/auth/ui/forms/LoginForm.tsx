import { Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import type { LoginDto } from '../../model/types';

interface ILoginFormProps {
  onSubmit: (data: LoginDto) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  const { onSubmit } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <Stack spacing={2} mt={1}>
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Пароль"
        type="password"
        fullWidth
      />

      <Button variant="contained" onClick={handleSubmit}>
        Войти
      </Button>
    </Stack>
  );
};
