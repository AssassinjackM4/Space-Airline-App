package com.airline.airline_server.repositories;

import com.airline.airline_server.models.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByStatus(String status);
    List<Booking> findByFlightId(String flightId);
}
