// src/components/Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import FlightIcon from '@mui/icons-material/Flight';

// Estilizar el AppBar con un fondo sólido
const StyledAppBar = styled(AppBar)`
  background-color: #ffffff !important; /* Fondo blanco */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
`;

// Estilizar el logo
const Logo = styled(FlightIcon)`
  margin-right: 8px;
  color: #1976d2; /* Azul primario */
`;

// Estilizar el botón "Wellezy" para que sea un enlace a Home
const LogoButton = styled(Button)`
  text-transform: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
`;

const Navbar = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        {/* Logo de Vuelo */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          component={RouterLink}
          to="/"
          sx={{ mr: 2 }}
        >
          <Logo />
        </IconButton>
        
        {/* Botón "Wellezy" que redirige a Home */}
        <LogoButton
          component={RouterLink}
          to="/"
          sx={{
            marginRight: 'auto', // Empuja los botones de navegación hacia la derecha
            padding: 0,
            minWidth: 'auto',
            fontSize: '1.5rem',
          }}
        >
          Wellezy
        </LogoButton>
        
        {/* Botones de Navegación */}
        <Button
          component={RouterLink}
          to="/search"
          variant="contained"
          color="primary"
          sx={{ borderRadius: '20px', marginLeft: 2 }}
        >
          Buscar Vuelos
        </Button>
        <Button
          component={RouterLink}
          to="/iata-search"
          variant="contained"
          color="primary"
          sx={{ borderRadius: '20px', marginLeft: 2 }}
        >
          Buscar Codigos IATA
        </Button>
        {/* Puedes añadir más botones aquí si es necesario */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
