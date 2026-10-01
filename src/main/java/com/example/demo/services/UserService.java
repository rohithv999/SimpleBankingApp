package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

        createAdminIfNeeded();
    }

    private void createAdminIfNeeded() {

        User admin = userRepository.findByUsername("admin");

        if (admin == null) {
            User newAdmin = new User();

            newAdmin.setUsername("admin");
            newAdmin.setPassword(
                    passwordEncoder.encode("admin123"));
            newAdmin.setRole("ADMIN");

            userRepository.save(newAdmin);
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User register(User user) {

        // "admin" is reserved
        if (user.getUsername().equalsIgnoreCase("admin")) {
            return null;
        }

        // Username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return null;
        }

        // Every normal registration is a USER
        user.setRole("USER");

        user.setPassword(
                passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username);

        if (user == null) {
            return null;
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }

        return user;
    }
}