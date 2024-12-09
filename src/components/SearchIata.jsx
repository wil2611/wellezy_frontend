// src/components/SearchIata.js

import React, { useState } from 'react';
import { TextField, Button, Alert, Box, Container } from '@mui/material';
import api from '../services/api'; // Importar el controlador de API

const SearchIata = ({ onSearchResult }) => {
  const [city, setCity] = useState('');
  const [iataCode, setIataCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) {
      setError('Por favor, ingresa el nombre de una ciudad.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await api.searchIataCode({ code: city });
      if (response.cities && response.cities.length > 0) {
        setIataCode(response.cities[0].codeIataCity);
        onSearchResult(response.cities[0]); // Notificar al componente principal con los resultados
      } else {
        setIataCode(null);
        setError('No se encontró un código IATA para esta ciudad.');
      }
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pt: 8 }}> {/* Espaciado superior de 8 unidades para evitar que el AppBar lo tape */}
      <Container maxWidth="sm">
        <TextField
          label="Ciudad"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ marginBottom: 2 }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>

        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
        {iataCode && <Alert severity="success" sx={{ marginTop: 2 }}>Código IATA: {iataCode}</Alert>}
      </Container>
    </Box>
  );
};

export default SearchIata;
