import { Container, Typography, Box } from '@mui/material';

export const HomePage = () => (
  <Container>
    <Box mt={6}>
      <Typography variant="h3" gutterBottom>
        Добро пожаловать
      </Typography>
      <Typography variant="body1">Это демо-проект JWT авторизации на React + NestJS</Typography>
    </Box>
  </Container>
);
