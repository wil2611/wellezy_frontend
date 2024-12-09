// src/services/flightService.js

//import api from '/services/api'; // Asegúrate de tener el servicio api configurado
import api from '../api';
/**
 * Función para manejar la búsqueda de vuelos.
 *
 * @param {Object} searchParams - Parámetros de búsqueda del formulario.
 * @param {Function} setIsLoading - Función para actualizar el estado de carga.
 * @param {Function} setSearchResults - Función para actualizar los resultados de la búsqueda.
 * @param {Function} setError - Función para actualizar el estado de error.
 */
export const searchFlights = async (searchParams, setIsLoading, setSearchResults, setError) => {
  setIsLoading(true); // Iniciar carga
  try {
    const response = await api.searchFlights(searchParams); // Usar el controlador de API
    if (response.success) {
      setSearchResults(response.data);
      setError(null);
    } else {
      setError('No se encontraron vuelos con los parámetros proporcionados.');
      setSearchResults([]);
    }
  } catch (error) {
    console.error('Error al buscar vuelos:', error);
    setError('Ocurrió un error al buscar los vuelos. Por favor, intenta nuevamente más tarde.');
    setSearchResults([]);
  } finally {
    setIsLoading(false); // Finalizar carga
  }
};
