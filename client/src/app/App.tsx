import { RouterProvider } from 'react-router-dom';
import { router } from './providers/router/router';
import { AppThemeProvider } from './providers/theme/ThemeProvider';

export const App = () => {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  );
};
