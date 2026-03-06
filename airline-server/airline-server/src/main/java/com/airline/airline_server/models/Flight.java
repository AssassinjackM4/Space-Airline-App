package com.airline.airline_server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "flights")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    private String id;
    private String flightNumber;
    private String airline;
    private String aircraftType;
    private String departureAirport;
    private String arrivalAirport;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private int totalSeats;
    private int availableSeats;
    private double price;
    private String status; // SCHEDULED, DEPARTED, ARRIVED, CANCELLED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
