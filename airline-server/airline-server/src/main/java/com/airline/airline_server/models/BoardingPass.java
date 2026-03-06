package com.airline.airline_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "boarding_passes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardingPass {
    @Id
    private String id;
    private String bookingId;
    private String userId;
    private String flightNumber;
    private String passengerName;
    private String seatNumber;
    private String boardingPassNumber;
    private String departureAirport;
    private String arrivalAirport;
    private LocalDateTime departureTime;
    private LocalDateTime boardingTime;
    private String status; // ISSUED, USED, EXPIRED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
