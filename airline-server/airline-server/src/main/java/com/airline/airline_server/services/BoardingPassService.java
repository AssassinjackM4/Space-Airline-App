package com.airline.airline_server.services;

import com.airline.airline_server.models.BoardingPass;
import com.airline.airline_server.repositories.BoardingPassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BoardingPassService {
    @Autowired
    private BoardingPassRepository boardingPassRepository;

    public BoardingPass createBoardingPass(String bookingId, String userId, String flightNumber, 
                                          String passengerName, String departureAirport, String arrivalAirport,
                                          LocalDateTime departureTime) {
        BoardingPass boardingPass = new BoardingPass();
        boardingPass.setBookingId(bookingId);
        boardingPass.setUserId(userId);
        boardingPass.setFlightNumber(flightNumber);
        boardingPass.setPassengerName(passengerName);
        boardingPass.setSeatNumber(generateSeatNumber());
        boardingPass.setBoardingPassNumber(generateBoardingPassNumber());
        boardingPass.setDepartureAirport(departureAirport);
        boardingPass.setArrivalAirport(arrivalAirport);
        boardingPass.setDepartureTime(departureTime);
        boardingPass.setBoardingTime(departureTime.minusHours(2));
        boardingPass.setStatus("ISSUED");
        boardingPass.setCreatedAt(LocalDateTime.now());
        boardingPass.setUpdatedAt(LocalDateTime.now());
        return boardingPassRepository.save(boardingPass);
    }

    public Optional<BoardingPass> getBoardingPassById(String id) {
        return boardingPassRepository.findById(id);
    }

    public Optional<BoardingPass> getBoardingPassByNumber(String number) {
        return boardingPassRepository.findByBoardingPassNumber(number);
    }

    public List<BoardingPass> getUserBoardingPasses(String userId) {
        return boardingPassRepository.findByUserId(userId);
    }

    public List<BoardingPass> getBookingBoardingPasses(String bookingId) {
        return boardingPassRepository.findByBookingId(bookingId);
    }

    public List<BoardingPass> getFlightBoardingPasses(String flightNumber) {
        return boardingPassRepository.findByFlightNumber(flightNumber);
    }

    public BoardingPass updateBoardingPassStatus(String id, String status) {
        Optional<BoardingPass> boardingPass = boardingPassRepository.findById(id);
        if (boardingPass.isPresent()) {
            BoardingPass bp = boardingPass.get();
            bp.setStatus(status);
            bp.setUpdatedAt(LocalDateTime.now());
            return boardingPassRepository.save(bp);
        }
        return null;
    }

    private String generateSeatNumber() {
        int row = 1 + (int)(Math.random() * 20);
        char seat = (char)('A' + (int)(Math.random() * 6));
        return row + "" + seat;
    }

    private String generateBoardingPassNumber() {
        return "BP" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
    }
}
