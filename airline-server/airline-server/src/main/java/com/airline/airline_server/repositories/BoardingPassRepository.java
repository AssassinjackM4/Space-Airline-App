package com.airline.airline_server.repositories;

import com.airline.airline_server.models.BoardingPass;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BoardingPassRepository extends MongoRepository<BoardingPass, String> {
    List<BoardingPass> findByUserId(String userId);
    List<BoardingPass> findByBookingId(String bookingId);
    Optional<BoardingPass> findByBoardingPassNumber(String boardingPassNumber);
    List<BoardingPass> findByFlightNumber(String flightNumber);
}
