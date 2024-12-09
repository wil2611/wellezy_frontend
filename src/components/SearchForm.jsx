// src/components/SearchForm.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

/**
 * Componente de formulario para buscar vuelos.
 *
 * @param {Function} onSearch - Función a ejecutar al enviar el formulario con los parámetros de búsqueda.
 */
const FormContainer = styled(Paper)`
  padding: 32px;
  margin-top: 32px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const SearchForm = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: {
      direct: false, // Checkbox para vuelos directos
      currency: 'COP',
      searchs: 50,
      class: false,
      qtyPassengers: 1,
      adult: 1,
      child: 0,
      baby: 0,
      seat: 0,
      itinerary: [
        {
          departureCity: '',
          arrivalCity: '',
          hour: '',
        },
      ],
    },
    validationSchema: Yup.object({
      direct: Yup.boolean(),
      currency: Yup.string()
        .required('Moneda es requerida')
        .length(3, 'Debe tener 3 caracteres'),
      searchs: Yup.number()
        .required('Cantidad de búsquedas es requerida')
        .min(1, 'Debe haber al menos 1 búsqueda'),
      class: Yup.boolean(),
      qtyPassengers: Yup.number()
        .required('Cantidad de pasajeros es requerida')
        .min(1, 'Debe haber al menos 1 pasajero'),
      adult: Yup.number()
        .required('Cantidad de adultos es requerida')
        .min(1, 'Debe haber al menos 1 adulto')
        .max(Yup.ref('qtyPassengers'), 'Adultos no pueden exceder pasajeros totales'),
      child: Yup.number()
        .min(0, 'La cantidad de niños no puede ser negativa')
        .max(Yup.ref('qtyPassengers'), 'Niños no pueden exceder pasajeros totales'),
      baby: Yup.number()
        .min(0, 'La cantidad de bebés no puede ser negativa')
        .max(Yup.ref('qtyPassengers'), 'Bebés no pueden exceder pasajeros totales'),
      seat: Yup.number().min(0, 'La cantidad de asientos no puede ser negativa'),
      itinerary: Yup.array()
        .of(
          Yup.object({
            departureCity: Yup.string()
              .required('Ciudad de salida es requerida')
              .length(3, 'Debe tener 3 caracteres'),
            arrivalCity: Yup.string()
              .required('Ciudad de llegada es requerida')
              .length(3, 'Debe tener 3 caracteres'),
            hour: Yup.date()
              .required('Fecha y hora de salida es requerida')
              .typeError('Fecha y hora de salida debe ser una fecha válida'),
          })
        )
        .min(1, 'Debe haber al menos un itinerario'),
    }),
    onSubmit: (values) => {
      // Formatear la fecha y hora a ISO 8601
      const formattedValues = {
        ...values,
        itinerary: values.itinerary.map((item) => ({
          ...item,
          hour: new Date(item.hour).toISOString(),
        })),
      };
      // Reestructurar según la API requerida
      const apiRequest = {
        direct: formattedValues.direct,
        currency: formattedValues.currency,
        searchs: formattedValues.searchs,
        class: formattedValues.class,
        qtyPassengers: formattedValues.qtyPassengers,
        adult: formattedValues.adult,
        child: formattedValues.child,
        baby: formattedValues.baby,
        seat: formattedValues.seat,
        itinerary: formattedValues.itinerary,
        // Añade otros campos según tu API
      };
      onSearch(apiRequest);
    },
  });

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" gutterBottom color="primary">
        Buscar Vuelos
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Ciudad de Salida */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="itinerary[0].departureCity"
              name="itinerary[0].departureCity"
              label="Ciudad de Salida (IATA)"
              value={formik.values.itinerary[0].departureCity}
              onChange={formik.handleChange}
              error={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].departureCity &&
                Boolean(formik.errors.itinerary?.[0]?.departureCity)
              }
              helperText={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].departureCity &&
                formik.errors.itinerary?.[0]?.departureCity
              }
              inputProps={{ maxLength: 3, style: { textTransform: 'uppercase' } }}
            />
          </Grid>
          {/* Ciudad de Llegada */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="itinerary[0].arrivalCity"
              name="itinerary[0].arrivalCity"
              label="Ciudad de Llegada (IATA)"
              value={formik.values.itinerary[0].arrivalCity}
              onChange={formik.handleChange}
              error={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].arrivalCity &&
                Boolean(formik.errors.itinerary?.[0]?.arrivalCity)
              }
              helperText={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].arrivalCity &&
                formik.errors.itinerary?.[0]?.arrivalCity
              }
              inputProps={{ maxLength: 3, style: { textTransform: 'uppercase' } }}
            />
          </Grid>
          {/* Fecha y Hora de Salida */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              id="itinerary[0].hour"
              name="itinerary[0].hour"
              label="Fecha y Hora de Salida"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formik.values.itinerary[0].hour}
              onChange={formik.handleChange}
              error={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].hour &&
                Boolean(formik.errors.itinerary?.[0]?.hour)
              }
              helperText={
                formik.touched.itinerary &&
                formik.touched.itinerary[0] &&
                formik.touched.itinerary[0].hour &&
                formik.errors.itinerary?.[0]?.hour
              }
            />
          </Grid>
          {/* Moneda */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="currency"
              name="currency"
              label="Moneda"
              value={formik.values.currency}
              onChange={formik.handleChange}
              error={formik.touched.currency && Boolean(formik.errors.currency)}
              helperText={formik.touched.currency && formik.errors.currency}
              inputProps={{ maxLength: 3, style: { textTransform: 'uppercase' } }}
            />
          </Grid>
          {/* Cantidad de Búsquedas */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="searchs"
              name="searchs"
              label="Cantidad de Búsquedas"
              type="number"
              inputProps={{ min: 1 }}
              value={formik.values.searchs}
              onChange={formik.handleChange}
              error={formik.touched.searchs && Boolean(formik.errors.searchs)}
              helperText={formik.touched.searchs && formik.errors.searchs}
            />
          </Grid>
          {/* Clase de Vuelo */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControlLabel
              control={
                <Checkbox
                  id="class"
                  name="class"
                  checked={formik.values.class}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="Clase Business"
            />
          </Grid>
          {/* Checkbox para Vuelos Directos */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControlLabel
              control={
                <Checkbox
                  id="direct"
                  name="direct"
                  checked={formik.values.direct}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="Vuelos Directos"
            />
          </Grid>
          {/* Cantidad de Pasajeros */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="qtyPassengers"
              name="qtyPassengers"
              label="Pasajeros Totales"
              type="number"
              inputProps={{ min: 1 }}
              value={formik.values.qtyPassengers}
              onChange={formik.handleChange}
              error={formik.touched.qtyPassengers && Boolean(formik.errors.qtyPassengers)}
              helperText={formik.touched.qtyPassengers && formik.errors.qtyPassengers}
            />
          </Grid>
          {/* Cantidad de Adultos */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="adult"
              name="adult"
              label="Adultos"
              type="number"
              inputProps={{ min: 1, max: formik.values.qtyPassengers }}
              value={formik.values.adult}
              onChange={formik.handleChange}
              error={formik.touched.adult && Boolean(formik.errors.adult)}
              helperText={formik.touched.adult && formik.errors.adult}
            />
          </Grid>
          {/* Cantidad de Niños */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="child"
              name="child"
              label="Niños"
              type="number"
              inputProps={{ min: 0, max: formik.values.qtyPassengers }}
              value={formik.values.child}
              onChange={formik.handleChange}
              error={formik.touched.child && Boolean(formik.errors.child)}
              helperText={formik.touched.child && formik.errors.child}
            />
          </Grid>
          {/* Cantidad de Bebés */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="baby"
              name="baby"
              label="Bebés"
              type="number"
              inputProps={{ min: 0, max: formik.values.qtyPassengers }}
              value={formik.values.baby}
              onChange={formik.handleChange}
              error={formik.touched.baby && Boolean(formik.errors.baby)}
              helperText={formik.touched.baby && formik.errors.baby}
            />
          </Grid>
          {/* Cantidad de Asientos */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              id="seat"
              name="seat"
              label="Asientos"
              type="number"
              inputProps={{ min: 0 }}
              value={formik.values.seat}
              onChange={formik.handleChange}
              error={formik.touched.seat && Boolean(formik.errors.seat)}
              helperText={formik.touched.seat && formik.errors.seat}
            />
          </Grid>
          {/* Botón de Búsqueda */}
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Buscar Vuelos
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default SearchForm;
