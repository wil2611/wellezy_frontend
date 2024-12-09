// src/components/PassengerForm.jsx

import React from 'react';
import { useFormik, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import api from '../services/api';

/**
 * Componente para ingresar los datos de los pasajeros.
 *
 * @param {Object} flight - Información del vuelo seleccionado.
 * @param {Function} onSuccess - Función a ejecutar al confirmar la reserva exitosamente.
 */
const FormContainer = styled(Paper)`
  padding: 24px;
  margin-top: 24px;
  background-color: #ffffff;
`;

const PassengerForm = ({ flight, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      passengers: Array(flight.qtyPassengers).fill({
        firstName: '',
        lastName: '',
        age: '',
        passportNumber: '',
      }),
    },
    validationSchema: Yup.object({
      passengers: Yup.array()
        .of(
          Yup.object({
            firstName: Yup.string().required('Nombre es requerido'),
            lastName: Yup.string().required('Apellido es requerido'),
            age: Yup.number()
              .required('Edad es requerida')
              .min(0, 'Edad inválida'),
            passportNumber: Yup.string().required('Número de pasaporte es requerido'),
          })
        )
        .required('Debe haber pasajeros'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          flightId: flight.id,
          passengers: values.passengers,
        };
        const response = await api.post('/reservations', payload);
        if (response.data.success) {
          onSuccess(response.data.data);
        } else {
          // Manejar respuesta de error desde el backend
          alert('Error al realizar la reserva. Por favor, intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error al hacer la reserva:', error);
        alert('Ocurrió un error al realizar la reserva. Por favor, intenta nuevamente más tarde.');
      }
    },
  });

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        Datos de los Pasajeros
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FieldArray
          name="passengers"
          render={() =>
            formik.values.passengers.map((passenger, index) => (
              <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name={`passengers[${index}].firstName`}
                    value={passenger.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].firstName &&
                      Boolean(formik.errors.passengers?.[index]?.firstName)
                    }
                    helperText={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].firstName &&
                      formik.errors.passengers?.[index]?.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name={`passengers[${index}].lastName`}
                    value={passenger.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].lastName &&
                      Boolean(formik.errors.passengers?.[index]?.lastName)
                    }
                    helperText={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].lastName &&
                      formik.errors.passengers?.[index]?.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <TextField
                    fullWidth
                    label="Edad"
                    name={`passengers[${index}].age`}
                    type="number"
                    inputProps={{ min: 0 }}
                    value={passenger.age}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].age &&
                      Boolean(formik.errors.passengers?.[index]?.age)
                    }
                    helperText={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].age &&
                      formik.errors.passengers?.[index]?.age
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="Número de Pasaporte"
                    name={`passengers[${index}].passportNumber`}
                    value={passenger.passportNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].passportNumber &&
                      Boolean(formik.errors.passengers?.[index]?.passportNumber)
                    }
                    helperText={
                      formik.touched.passengers &&
                      formik.touched.passengers[index] &&
                      formik.touched.passengers[index].passportNumber &&
                      formik.errors.passengers?.[index]?.passportNumber
                    }
                  />
                </Grid>
              </Grid>
            ))
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Confirmar Reserva
        </Button>
      </form>
    </FormContainer>
  );
};

export default PassengerForm;
