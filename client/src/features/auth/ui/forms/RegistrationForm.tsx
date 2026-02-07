import { Button, TextField, Stack } from '@mui/material';
import type { RegisterDto } from '../../model/types';
import { useState } from 'react';

interface IRegistrationFormProps {
  onSubmit: (data: RegisterDto) => void;
}

export const RegistrationForm = (props: IRegistrationFormProps) => {
  const { onSubmit } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(name ? { email, password, name } : { email, password });
  };

  return (
    <Stack spacing={2} mt={1}>
      <TextField value={name} onChange={(e) => setName(e.target.value)} label="Имя" fullWidth />
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
