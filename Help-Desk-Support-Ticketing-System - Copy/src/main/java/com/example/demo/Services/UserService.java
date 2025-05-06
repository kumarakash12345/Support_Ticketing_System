package com.example.demo.Services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.UserDto;
import com.example.demo.Repository.UsersRepository;
import com.example.demo.entity.User;
import com.example.demo.security.JwtUtil;


@Service
public class UserService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(UsersRepository usersRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // ✅ Register a new user
    public String register(UserDto userDto) {
        Optional<User> existingUser = usersRepository.findByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User newUser = new User();
        newUser.setName(userDto.getName());
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword())); // encode password
        newUser.setRole(userDto.getRole());

        usersRepository.save(newUser);
        return "User registered successfully";
    }

    // ✅ Login user and return JWT token
    public String login(LoginDto loginDto) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(), loginDto.getPassword()));

        // Generate JWT token and return
        return jwtUtil.generateToken(loginDto.getEmail());
    }

    // ✅ Get user by ID
    public User getUserById(UUID userId) {
        return usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ Get user by email
    public User getUserByEmail(String email) {
        return usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ Validate JWT token and get username
    public String getUsernameFromToken(String token) {
        return jwtUtil.getUsernameFromToken(token);
    }

    // ✅ Validate if JWT token is expired or invalid
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
}