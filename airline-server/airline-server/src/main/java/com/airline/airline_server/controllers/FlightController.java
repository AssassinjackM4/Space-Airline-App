package com.airline.airline_server.controllers;

import com.airline.airline_server.dto.FlightRequest;
import com.airline.airline_server.models.Flight;
import com.airline.airline_server.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    @PostMapping("/admin/create")
    public ResponseEntity<?> createFlight(@RequestBody FlightRequest request) {
        Flight flight = new Flight();
        flight.setFlightNumber(request.getFlightNumber());
        flight.setAirline(request.getAirline());
        flight.setAircraftType(request.getAircraftType());
        flight.setDepartureAirport(request.getDepartureAirport());
        flight.setArrivalAirport(request.getArrivalAirport());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setTotalSeats(request.getTotalSeats());
        flight.setAvailableSeats(request.getAvailableSeats());
        flight.setPrice(request.getPrice());

        Flight created = flightService.createFlight(flight);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/public/all")
    public ResponseEntity<?> getAllFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return ResponseEntity.ok(flights);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<?> getFlightById(@PathVariable String id) {
        Optional<Flight> flight = flightService.getFlightById(id);
        if (flight.isPresent()) {
            return ResponseEntity.ok(flight.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Flight not found"));
    }

    @GetMapping("/public/search")
    public ResponseEntity<?> searchFlights(
            @RequestParam String departure,
            @RequestParam String arrival) {
        List<Flight> flights = flightService.searchFlights(departure, arrival);
        return ResponseEntity.ok(flights);
    }

    @GetMapping("/public/active")
    public ResponseEntity<?> getActiveFlights() {
        List<Flight> flights = flightService.getActiveFlights();
        return ResponseEntity.ok(flights);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateFlight(@PathVariable String id, @RequestBody FlightRequest request) {
        Flight flight = new Flight();
        flight.setFlightNumber(request.getFlightNumber());
        flight.setAirline(request.getAirline());
        flight.setAircraftType(request.getAircraftType());
        flight.setDepartureAirport(request.getDepartureAirport());
        flight.setArrivalAirport(request.getArrivalAirport());
        flight.setDepartureTime(request.getDepartureTime());
        flight.setArrivalTime(request.getArrivalTime());
        flight.setTotalSeats(request.getTotalSeats());
        flight.setAvailableSeats(request.getAvailableSeats());
        flight.setPrice(request.getPrice());

        Flight updated = flightService.updateFlight(id, flight);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Flight not found"));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteFlight(@PathVariable String id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok(new ApiResponse(true, "Flight deleted successfully"));
    }

    // Helper response class
    public static class ApiResponse {
        public boolean success;
        public String message;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
    }
}
