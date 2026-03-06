package com.airline.airline_server.services;

import com.airline.airline_server.models.Flight;
import com.airline.airline_server.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    public Flight createFlight(Flight flight) {
        flight.setStatus("SCHEDULED");
        flight.setCreatedAt(LocalDateTime.now());
        flight.setUpdatedAt(LocalDateTime.now());
        return flightRepository.save(flight);
    }

    public Optional<Flight> getFlightById(String id) {
        return flightRepository.findById(id);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public List<Flight> searchFlights(String departure, String arrival) {
        return flightRepository.findByDepartureAirportAndArrivalAirport(departure, arrival);
    }

    public List<Flight> getFlightsByNumber(String flightNumber) {
        return flightRepository.findByFlightNumber(flightNumber);
    }

    public List<Flight> getActiveFlights() {
        return flightRepository.findByStatus("SCHEDULED");
    }

    public Flight updateFlight(String id, Flight updates) {
        Optional<Flight> existingFlight = flightRepository.findById(id);
        if (existingFlight.isPresent()) {
            Flight flight = existingFlight.get();
            flight.setFlightNumber(updates.getFlightNumber() != null ? updates.getFlightNumber() : flight.getFlightNumber());
            flight.setAirline(updates.getAirline() != null ? updates.getAirline() : flight.getAirline());
            flight.setAircraftType(updates.getAircraftType() != null ? updates.getAircraftType() : flight.getAircraftType());
            flight.setDepartureAirport(updates.getDepartureAirport() != null ? updates.getDepartureAirport() : flight.getDepartureAirport());
            flight.setArrivalAirport(updates.getArrivalAirport() != null ? updates.getArrivalAirport() : flight.getArrivalAirport());
            flight.setDepartureTime(updates.getDepartureTime() != null ? updates.getDepartureTime() : flight.getDepartureTime());
            flight.setArrivalTime(updates.getArrivalTime() != null ? updates.getArrivalTime() : flight.getArrivalTime());
            flight.setTotalSeats(updates.getTotalSeats() > 0 ? updates.getTotalSeats() : flight.getTotalSeats());
            flight.setAvailableSeats(updates.getAvailableSeats() >= 0 ? updates.getAvailableSeats() : flight.getAvailableSeats());
            flight.setPrice(updates.getPrice() > 0 ? updates.getPrice() : flight.getPrice());
            flight.setStatus(updates.getStatus() != null ? updates.getStatus() : flight.getStatus());
            flight.setUpdatedAt(LocalDateTime.now());
            return flightRepository.save(flight);
        }
        return null;
    }

    public void deleteFlight(String id) {
        flightRepository.deleteById(id);
    }

    public boolean updateAvailableSeats(String flightId, int seatsToBook) {
        Optional<Flight> flight = flightRepository.findById(flightId);
        if (flight.isPresent()) {
            Flight f = flight.get();
            if (f.getAvailableSeats() >= seatsToBook) {
                f.setAvailableSeats(f.getAvailableSeats() - seatsToBook);
                f.setUpdatedAt(LocalDateTime.now());
                flightRepository.save(f);
                return true;
            }
        }
        return false;
    }
}
