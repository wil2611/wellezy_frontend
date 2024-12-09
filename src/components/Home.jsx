// src/components/Home.jsx

import React from 'react';
import { Typography, Button, Container, Grid, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import bannerImage from '../assets/banner.jpg'; // Asegúrate de tener una imagen en esta ruta

const BackgroundSection = styled(Box)`
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Cubre toda la altura de la ventana */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #ffffff;
  text-align: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Overlay oscuro */
    z-index: 1;
  }
`;

const ContentContainer = styled(Container)`
  position: relative;
  z-index: 2; /* Por encima del overlay */
`;

const FeatureBox = styled(Box)`
  padding: 24px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente blanco */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Home = () => {
  return (
    <BackgroundSection>
      <ContentContainer>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Bienvenido a Wellezy
        </Typography>
        <Typography variant="h5" gutterBottom>
          Encuentra los mejores vuelos al mejor precio
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={RouterLink}
          to="/search"
          sx={{
            mt: 3,
            paddingX: 4,
            paddingY: 1.5,
            fontSize: '1.2rem',
            borderRadius: '20px',
          }}
        >
          Buscar Vuelos
        </Button>
        {/* Sección de Beneficios */}
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox>
              <Typography variant="h6" gutterBottom>
                Variedad de Vuelos
              </Typography>
              <Typography variant="body2">
                Accede a una amplia selección de vuelos nacionales e internacionales con múltiples opciones de horarios.
              </Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox>
              <Typography variant="h6" gutterBottom>
                Precios Competitivos
              </Typography>
              <Typography variant="body2">
                Encuentra los mejores precios y ofertas exclusivas para tus viajes, garantizando la mejor relación calidad-precio.
              </Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureBox>
              <Typography variant="h6" gutterBottom>
                Atención al Cliente
              </Typography>
              <Typography variant="body2">
                Nuestro equipo de soporte está disponible 24/7 para ayudarte en todo lo que necesites durante tu reserva y viaje.
              </Typography>
            </FeatureBox>
          </Grid>
        </Grid>
      </ContentContainer>
    </BackgroundSection>
  );
};

export default Home;
