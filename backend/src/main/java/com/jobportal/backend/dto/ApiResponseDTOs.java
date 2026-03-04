package com.jobportal.backend.dto;

import com.jobportal.backend.model.ApplicationStatus;
import com.jobportal.backend.model.UserRole;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Data
@Builder
public class UserResponse {
    private UUID id;
    private String email;
    private String fullName;
    private UserRole role;
    private LocalDateTime createdAt;
}

@Data
@Builder
public class JobResponse {
    private UUID id;
    private String title;
    private String companyName;
    private String description;
    private String location;
    private Double salaryMin;
    private Double salaryMax;
    private String jobType;
    private List<String> skills;
    private LocalDateTime createdAt;
    private UUID employerId;
}

@Data
@Builder
public class ApplicationResponse {
    private UUID id;
    private UUID jobId;
    private String jobTitle;
    private String companyName;
    private UUID candidateId;
    private String candidateName;
    private String resumeUrl;
    private String coverLetter;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
}
