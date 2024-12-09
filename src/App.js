// src/App.js

import React, { useState } from 'react';
import { Container, Alert } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SearchForm from './components/SearchForm';
import SearchIata from './components/SearchIata';
import FlightsTable from './components/FlightsTable';
import PassengerForm from './components/PassengerForm';
import ReservationSuccess from './components/ReservationSuccess';
import Navbar from './components/Navbar';
import { searchFlights } from './services/controllers/flightService'; // Importa la función de búsqueda de vuelos
import { searchIataCode } from './services/controllers/iataService'; // Importa la función de búsqueda de IATA

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iataCity, setIataCity] = useState(null);

  const handleSearch = async (searchParams) => {
    await searchFlights(searchParams, setIsLoading, setSearchResults, setError);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleReservationSuccess = (data) => {
    setReservation(data);
    setSearchResults([]);
    setSelectedFlight(null);
    setError(null);
  };

  const handleIataSearch = async (city) => {
    await searchIataCode(city, setIsLoading, setIataCity, setError);
  };

  return (
    <Router>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={
            <>
              <SearchForm onSearch={handleSearch} />
              {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
              <FlightsTable
                flights={searchResults}
                onSelectFlight={handleSelectFlight}
                isLoading={isLoading}
              />
              {selectedFlight && <PassengerForm flight={selectedFlight} onSuccess={handleReservationSuccess} />}
            </>
          } />
          <Route path="/iata-search" element={
            <>
              <SearchIata onSearch={handleIataSearch} />
              {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
              {iataCity && (
                <div>
                  <h3>Ciudad seleccionada: {iataCity.nameCity}</h3>
                  <p>Código IATA: {iataCity.codeIataCity}</p>
                </div>
              )}
            </>
          } />
          <Route
            path="/reservation-success"
            element={reservation ? <ReservationSuccess reservation={reservation} /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
