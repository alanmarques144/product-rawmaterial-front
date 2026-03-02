import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f192c',
      dark: '#060d18',
    },
    secondary: {
      main: '#03DAC6',
      dark: '#018786',
    },
    background: {
      default: '#e2ecf7',
      paper: '#FFFFFF',
    },
  },
});