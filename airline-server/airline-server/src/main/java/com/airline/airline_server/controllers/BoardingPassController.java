package com.airline.airline_server.controllers;

import com.airline.airline_server.models.BoardingPass;
import com.airline.airline_server.services.BoardingPassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boarding-passes")
public class BoardingPassController {
    @Autowired
    private BoardingPassService boardingPassService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getBoardingPass(@PathVariable String id) {
        Optional<BoardingPass> boardingPass = boardingPassService.getBoardingPassById(id);
        if (boardingPass.isPresent()) {
            return ResponseEntity.ok(boardingPass.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Boarding pass not found"));
    }

    @GetMapping("/number/{number}")
    public ResponseEntity<?> getBoardingPassByNumber(@PathVariable String number) {
        Optional<BoardingPass> boardingPass = boardingPassService.getBoardingPassByNumber(number);
        if (boardingPass.isPresent()) {
            return ResponseEntity.ok(boardingPass.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Boarding pass not found"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserBoardingPasses(@PathVariable String userId) {
        List<BoardingPass> passes = boardingPassService.getUserBoardingPasses(userId);
        return ResponseEntity.ok(passes);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getBookingBoardingPasses(@PathVariable String bookingId) {
        List<BoardingPass> passes = boardingPassService.getBookingBoardingPasses(bookingId);
        return ResponseEntity.ok(passes);
    }

    @GetMapping("/flight/{flightNumber}")
    public ResponseEntity<?> getFlightBoardingPasses(@PathVariable String flightNumber) {
        List<BoardingPass> passes = boardingPassService.getFlightBoardingPasses(flightNumber);
        return ResponseEntity.ok(passes);
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<?> updateBoardingPassStatus(@PathVariable String id, @PathVariable String status) {
        BoardingPass updated = boardingPassService.updateBoardingPassStatus(id, status);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Boarding pass not found"));
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
