// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Para React 18
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import CssBaseline from '@mui/material/CssBaseline';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // React 18

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza los estilos */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Si usas reportWebVitals
