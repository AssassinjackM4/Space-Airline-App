package com.airline.airline_server.services;

import com.airline.airline_server.models.Booking;
import com.airline.airline_server.models.Flight;
import com.airline.airline_server.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightService flightService;

    public Booking createBooking(String userId, String flightId, int numberOfPassengers) {
        Optional<Flight> flight = flightService.getFlightById(flightId);
        if (flight.isPresent() && flightService.updateAvailableSeats(flightId, numberOfPassengers)) {
            Booking booking = new Booking();
            booking.setUserId(userId);
            booking.setFlightId(flightId);
            booking.setFlightNumber(flight.get().getFlightNumber());
            booking.setNumberOfPassengers(numberOfPassengers);
            booking.setTotalPrice(flight.get().getPrice() * numberOfPassengers);
            booking.setStatus("CONFIRMED");
            booking.setBookingReference(generateBookingReference());
            booking.setBookingDate(LocalDateTime.now());
            booking.setCreatedAt(LocalDateTime.now());
            booking.setUpdatedAt(LocalDateTime.now());
            booking.setDepartureAirport(flight.get().getDepartureAirport());
            booking.setArrivalAirport(flight.get().getArrivalAirport());
            booking.setDepartureTime(flight.get().getDepartureTime());
            booking.setArrivalTime(flight.get().getArrivalTime());
            return bookingRepository.save(booking);
        }
        return null;
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }

    public Optional<Booking> getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference);
    }

    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    public Booking updateBookingStatus(String bookingId, String status) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setStatus(status);
            b.setUpdatedAt(LocalDateTime.now());
            return bookingRepository.save(b);
        }
        return null;
    }

    public boolean cancelBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            if ("CONFIRMED".equals(b.getStatus())) {
                // Return seats to flight
                Optional<Flight> flight = flightService.getFlightById(b.getFlightId());
                if (flight.isPresent()) {
                    Flight f = flight.get();
                    f.setAvailableSeats(f.getAvailableSeats() + b.getNumberOfPassengers());
                    f.setUpdatedAt(LocalDateTime.now());
                    flightService.updateFlight(f.getId(), f);
                }
                b.setStatus("CANCELLED");
                b.setUpdatedAt(LocalDateTime.now());
                bookingRepository.save(b);
                return true;
            }
        }
        return false;
    }

    private String generateBookingReference() {
        return "BK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
