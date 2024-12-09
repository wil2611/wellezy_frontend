// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // La URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Hacer la solicitud para buscar vuelos.
 * @param {Object} searchParams - Parámetros de búsqueda.
 * @returns {Promise} - Promesa con la respuesta de la API.
 */
const searchFlights = async (searchParams) => {
  try {
    const response = await api.post('flights', searchParams);
    return response.data;
  } catch (error) {
    throw new Error('Error al buscar vuelos: ' + error.message);
  }
};

/*const searchFlights = async (searchParams) => {
  try {
    const response = await api.post('flights', searchParams);
    return response.data;
  } catch (error) {
    throw new Error('Error al buscar vuelos: ' + error.message);
  }
};*/

/**
 * Hacer la solicitud para buscar el código IATA de una ciudad.
 * @param {Object} searchParams - Parámetros de búsqueda (nombre de la ciudad).
 * @returns {Promise} - Promesa con la respuesta de la API.
 */
const searchIataCode = async (searchParams) => {
  try {
    const response = await api.post('airports', searchParams);
    return response.data;
  } catch (error) {
    throw new Error('Error al buscar código IATA: ' + error.message);
  }
};

const apiService = {
  searchFlights,
  searchIataCode,
};

export default apiService;
