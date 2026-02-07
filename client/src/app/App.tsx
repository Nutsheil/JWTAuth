import { RouterProvider } from 'react-router-dom';
import { router } from './providers/router/router';
import { AppThemeProvider } from './providers/theme/ThemeProvider';
import { Box } from '@mui/material';
import { AuthProvider } from './providers/auth/AuthProvider';

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <RouterProvider router={router} />
        </Box>
      </AuthProvider>
    </AppThemeProvider>
  );
};
