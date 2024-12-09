// src/components/ReservationSuccess.jsx

import React from 'react';
import { Typography, Paper, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import styled from 'styled-components';

/**
 * Componente para mostrar la confirmación de reserva.
 *
 * @param {Object} reservation - Detalles de la reserva confirmada.
 */
const SuccessContainer = styled(Paper)`
  padding: 24px;
  margin-top: 24px;
  background-color: #ffffff;
  text-align: center;
`;

const ReservationSuccess = ({ reservation }) => {
  const handleNewReservation = () => {
    window.location.reload(); // Reiniciar la aplicación para una nueva reserva
  };

  return (
    <SuccessContainer elevation={3}>
      <Typography variant="h4" gutterBottom color="primary">
        ¡Reserva Confirmada!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Gracias por tu reserva. A continuación, los detalles de tu reserva:
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2, textAlign: 'left' }}>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemText primary="Ciudad de Salida" secondary={reservation.departure_city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ciudad de Llegada" secondary={reservation.arrival_city} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fecha de Salida"
                secondary={new Date(reservation.departure_time).toLocaleString()}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            {/* Agrega más detalles si es necesario */}
            <ListItem>
              <ListItemText primary="Número de Reserva" secondary={reservation.id} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Pasajeros:
          </Typography>
          <List>
            {reservation.passengers.map((passenger) => (
              <ListItem key={passenger.id}>
                <ListItemText
                  primary={`${passenger.first_name} ${passenger.last_name}`}
                  secondary={`Pasaporte: ${passenger.passport_number} | Edad: ${passenger.age}`}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewReservation}
        sx={{ marginTop: 3 }}
      >
        Nueva Reserva
      </Button>
    </SuccessContainer>
  );
};

export default ReservationSuccess;
