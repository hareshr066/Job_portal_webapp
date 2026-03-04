package com.jobportal.backend.controller;

import com.jobportal.backend.dto.*;
import com.jobportal.backend.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobResponse> postJob(@RequestHeader("User-ID") UUID employerId, @Valid @RequestBody JobPostRequest request) {
        return ResponseEntity.ok(jobService.postJob(employerId, request));
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllActiveJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJob(@PathVariable UUID id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
}

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(@RequestHeader("User-ID") UUID candidateId, @Valid @RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(applicationService.applyForJob(candidateId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@RequestHeader("User-ID") UUID candidateId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCandidate(candidateId));
    }
}

// Global Exception Handling
package com.jobportal.backend.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err ->
            errors.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
}
