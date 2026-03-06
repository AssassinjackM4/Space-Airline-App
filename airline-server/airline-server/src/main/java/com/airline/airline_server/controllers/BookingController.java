package com.airline.airline_server.controllers;

import com.airline.airline_server.dto.BookingRequest;
import com.airline.airline_server.models.Booking;
import com.airline.airline_server.services.BookingService;
import com.airline.airline_server.services.BoardingPassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BoardingPassService boardingPassService;

    @PostMapping("/book")
    public ResponseEntity<?> createBooking(@RequestHeader("X-User-Id") String userId, @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(userId, request.getFlightId(), request.getNumberOfPassengers());
        
        if (booking != null) {
            // Create boarding passes for each passenger
            for (int i = 0; i < request.getNumberOfPassengers(); i++) {
                boardingPassService.createBoardingPass(
                    booking.getId(),
                    userId,
                    booking.getFlightNumber(),
                    request.getPassengerName(),
                    booking.getDepartureAirport(),
                    booking.getArrivalAirport(),
                    booking.getDepartureTime()
                );
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Booking failed - not enough seats available"));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBooking(@PathVariable String bookingId) {
        Optional<Booking> booking = bookingService.getBookingById(bookingId);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Booking not found"));
    }

    @GetMapping("/reference/{reference}")
    public ResponseEntity<?> getBookingByReference(@PathVariable String reference) {
        Optional<Booking> booking = bookingService.getBookingByReference(reference);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Booking not found"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserBookings(@PathVariable String userId) {
        List<Booking> bookings = bookingService.getUserBookings(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable String bookingId) {
        boolean cancelled = bookingService.cancelBooking(bookingId);
        if (cancelled) {
            return ResponseEntity.ok(new ApiResponse(true, "Booking cancelled successfully"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Cannot cancel booking"));
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
