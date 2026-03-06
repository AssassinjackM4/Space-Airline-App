package com.airline.airline_server.repositories;

import com.airline.airline_server.models.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends MongoRepository<Flight, String> {
    List<Flight> findByDepartureAirportAndArrivalAirport(String departure, String arrival);
    List<Flight> findByFlightNumber(String flightNumber);
    List<Flight> findByStatus(String status);
    List<Flight> findByDepartureTimeIsBetween(LocalDateTime start, LocalDateTime end);
}
