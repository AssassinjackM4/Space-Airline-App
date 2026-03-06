package com.airline.airline_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private String flightId;
    private int numberOfPassengers;
    private String passengerName;
}
