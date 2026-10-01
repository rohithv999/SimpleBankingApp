package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Register normal user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        User registeredUser = userService.register(user);

        if (registeredUser == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username is unavailable or reserved.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(registeredUser);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedInUser = userService.login(
                user.getUsername(),
                user.getPassword());

        if (loggedInUser == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password.");
        }

        return ResponseEntity.ok(loggedInUser);
    }
}