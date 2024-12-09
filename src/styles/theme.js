// src/styles/theme.js

import { createTheme } from '@mui/material/styles';

// Definir una paleta de colores suave y moderna
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul suave
    },
    secondary: {
      main: '#1976d2', // Rosa vibrante para acentos
    },
    background: {
      default: '#f5f5f5', // Gris claro
      paper: '#ffffff', // Blanco para componentes
    },
    text: {
      primary: '#333333', // Gris oscuro para texto principal
      secondary: '#757575', // Gris medio para texto secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontWeight: 700,
      color: '#ffffff', // Blanco para títulos sobre fondos oscuros
    },
    h6: {
      fontWeight: 500,
      color: '#000000',
    },
    body2: {
      color: '#000000',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
        containedSecondary: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#e73370',
          },
        },
      },
    },
  },
});

export default theme;
