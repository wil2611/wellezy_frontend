// src/services/iataService.js

//import api from './api'; // Asegúrate de tener el servicio api configurado
import api from '../api';
/**
 * Función para manejar la búsqueda de códigos IATA.
 *
 * @param {string} city - Ciudad a buscar.
 * @param {Function} setIsLoading - Función para actualizar el estado de carga.
 * @param {Function} setIataCity - Función para actualizar el estado de la ciudad con el código IATA.
 * @param {Function} setError - Función para actualizar el estado de error.
 */
export const searchIataCode = async (city, setIsLoading, setIataCity, setError) => {
  setIsLoading(true); // Iniciar carga
  try {
    const response = await api.searchIata(city); // Usar el controlador de API para buscar el código IATA
    if (response.success && response.data) {
      setIataCity(response.data); // Actualizar los resultados con los datos de la ciudad
      setError(null); // Limpiar cualquier error anterior
    } else {
      setError('No se encontró información para la ciudad proporcionada.');
      setIataCity(null);
    }
  } catch (error) {
    console.error('Error al buscar el código IATA:', error);
    setError('Ocurrió un error al buscar el código IATA. Por favor, intenta nuevamente más tarde.');
    setIataCity(null);
  } finally {
    setIsLoading(false); // Finalizar carga
  }
};
