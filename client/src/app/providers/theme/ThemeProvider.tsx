import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

interface IAppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = (props: IAppThemeProviderProps) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
