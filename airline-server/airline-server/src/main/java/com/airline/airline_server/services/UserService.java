package com.airline.airline_server.services;

import com.airline.airline_server.models.User;
import com.airline.airline_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String email, String password, String firstName, String lastName, 
                           String phone, String address, String city, String country, String passportNumber) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setAddress(address);
        user.setCity(city);
        user.setCountry(country);
        user.setPassportNumber(passportNumber);
        user.setUserType("USER");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setActive(true);
        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User updateUser(String userId, User updates) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setFirstName(updates.getFirstName() != null ? updates.getFirstName() : user.getFirstName());
            user.setLastName(updates.getLastName() != null ? updates.getLastName() : user.getLastName());
            user.setPhone(updates.getPhone() != null ? updates.getPhone() : user.getPhone());
            user.setAddress(updates.getAddress() != null ? updates.getAddress() : user.getAddress());
            user.setCity(updates.getCity() != null ? updates.getCity() : user.getCity());
            user.setCountry(updates.getCountry() != null ? updates.getCountry() : user.getCountry());
            user.setPassportNumber(updates.getPassportNumber() != null ? updates.getPassportNumber() : user.getPassportNumber());
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        }
        return null;
    }
}
