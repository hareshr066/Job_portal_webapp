package com.jobportal.backend.controller;

import com.jobportal.backend.dto.*;
import com.jobportal.backend.model.User;
import com.jobportal.backend.repository.UserRepository;
import com.jobportal.backend.security.JwtUtils;
import com.jobportal.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String jwt = jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwt)
                .email(request.getEmail())
                .build());
    }
}
