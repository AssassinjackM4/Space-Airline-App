package com.airline.airline_server.controllers;

import com.airline.airline_server.dto.AuthResponse;
import com.airline.airline_server.dto.LoginRequest;
import com.airline.airline_server.dto.SignupRequest;
import com.airline.airline_server.models.User;
import com.airline.airline_server.services.UserService;
import com.airline.airline_server.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userService.emailExists(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Email already exists"));
        }

        User user = userService.registerUser(
            request.getEmail(),
            request.getPassword(),
            request.getFirstName(),
            request.getLastName(),
            request.getPhone(),
            request.getAddress(),
            request.getCity(),
            request.getCountry(),
            request.getPassportNumber()
        );

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());
        AuthResponse response = new AuthResponse(
            token,
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getUserType()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = userService.getUserByEmail(request.getEmail());

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid credentials"));
        }

        if (!userService.validatePassword(request.getPassword(), user.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false, "Invalid credentials"));
        }

        String token = jwtTokenProvider.generateToken(user.get().getId(), user.get().getEmail());
        AuthResponse response = new AuthResponse(
            token,
            user.get().getId(),
            user.get().getEmail(),
            user.get().getFirstName(),
            user.get().getLastName(),
            user.get().getUserType()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable String userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "User not found"));
    }

    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable String userId, @RequestBody User updates) {
        User updated = userService.updateUser(userId, updates);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "User not found"));
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
