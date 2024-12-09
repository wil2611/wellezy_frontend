// src/components/FlightsTable.jsx

import React, { useState, useMemo } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import styled from 'styled-components';

/**
 * Componente para mostrar la tabla de resultados de vuelos.
 *
 * @param {Array} flights - Lista de vuelos obtenidos de la búsqueda.
 * @param {Function} onSelectFlight - Función a ejecutar al seleccionar un vuelo.
 */
const StyledTableContainer = styled(TableContainer)`
  margin-top: 24px;
`;

const FlightsTable = ({ flights, onSelectFlight }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState({
    airline: '',
    date: '',
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchesAirline = flight.marketingCarrier
        .toLowerCase()
        .includes(filter.airline.toLowerCase());
      const matchesDate = filter.date
        ? flight.itinerary[0].departure_time.startsWith(filter.date)
        : true;
      return matchesAirline && matchesDate;
    });
  }, [flights, filter]);

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ padding: '16px' }}>
        Resultados de Búsqueda
      </Typography>
      {/* Filtros */}
      <div style={{ padding: '0 16px 16px 16px' }}>
        <TextField
          label="Filtrar por Aerolínea"
          name="airline"
          value={filter.airline}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
          style={{ marginRight: '16px', width: '200px' }}
        />
        <TextField
          label="Filtrar por Fecha"
          name="date"
          type="date"
          value={filter.date}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          style={{ width: '200px' }}
        />
      </div>
      {/* Tabla de Vuelos */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Aerolínea</TableCell>
            <TableCell>Vuelo</TableCell>
            <TableCell>Origen</TableCell>
            <TableCell>Destino</TableCell>
            <TableCell>Fecha de Salida</TableCell>
            <TableCell>Hora de Salida</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Seleccionar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFlights
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>
                  <img
                    src={`https://pics.avs.io/60/60/${flight.marketingCarrier}.png`}
                    alt={flight.marketingCarrier}
                    style={{ width: '40px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://pics.avs.io/60/60/default.png';
                    }}
                  />
                </TableCell>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.itinerary[0].departure_city}</TableCell>
                <TableCell>{flight.itinerary[0].arrival_city}</TableCell>
                <TableCell>
                  {new Date(flight.itinerary[0].departure_time).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(flight.itinerary[0].departure_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>
                  {flight.price} {flight.currency}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onSelectFlight(flight)}
                  >
                    <Search />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {filteredFlights.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No se encontraron vuelos con los filtros aplicados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Paginación */}
      <TablePagination
        component="div"
        count={filteredFlights.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </StyledTableContainer>
  );
};

export default FlightsTable;
