// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1d2671', // Deep Blue
    },
    secondary: {
      main: '#c33764', // Vibrant Magenta
    },
    success: {
      main: '#4caf50', // Green for success messages
    },
    error: {
      main: '#f44336', // Red for error messages
    },
    background: {
      default: '#f5f5f5', // Light Gray
      paper: '#ffffff', // White
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
