package com.jobportal.backend.dto;

import com.jobportal.backend.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

// Request DTOs
@Data
public class UserRegistrationRequest {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Role is required")
    private UserRole role;
}

@Data
public class LoginRequest {
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}

@Data
public class JobPostRequest {
    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String description;
    private String location;
    private Double salaryMin;
    private Double salaryMax;
    private String jobType;
    private java.util.List<String> skills;
}

@Data
public class ApplicationRequest {
    @NotNull(message = "Job ID is required")
    private java.util.UUID jobId;

    @NotBlank(message = "Resume URL is required")
    private String resumeUrl;

    private String coverLetter;
}
