package com.jobportal.backend.service;

import com.jobportal.backend.dto.*;
import com.jobportal.backend.model.*;
import com.jobportal.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public UserResponse register(UserRegistrationRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword()) // In production, use BCrypt
                .fullName(request.getFullName())
                .role(request.getRole())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);
        return mapToUserResponse(savedUser);
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobResponse postJob(UUID employerId, JobPostRequest request) {
        User employer = userRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        Job job = Job.builder()
                .employer(employer)
                .title(request.getTitle())
                .companyName(request.getCompanyName())
                .description(request.getDescription())
                .location(request.getLocation())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .jobType(request.getJobType())
                .skills(request.getSkills())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        Job savedJob = jobRepository.save(job);
        return mapToJobResponse(savedJob);
    }

    public List<JobResponse> getAllActiveJobs() {
        return jobRepository.findByActiveTrue().stream()
                .map(this::mapToJobResponse)
                .collect(Collectors.toList());
    }

    public JobResponse getJobById(UUID id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return mapToJobResponse(job);
    }

    private JobResponse mapToJobResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .companyName(job.getCompanyName())
                .description(job.getDescription())
                .location(job.getLocation())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .jobType(job.getJobType())
                .skills(job.getSkills())
                .createdAt(job.getCreatedAt())
                .employerId(job.getEmployer().getId())
                .build();
    }
}

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationResponse applyForJob(UUID candidateId, ApplicationRequest request) {
        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = Application.builder()
                .job(job)
                .candidate(candidate)
                .resumeUrl(request.getResumeUrl())
                .coverLetter(request.getCoverLetter())
                .status(ApplicationStatus.PENDING)
                .appliedAt(LocalDateTime.now())
                .build();

        Application savedApp = applicationRepository.save(application);
        return mapToApplicationResponse(savedApp);
    }

    public List<ApplicationResponse> getApplicationsByCandidate(UUID candidateId) {
        return applicationRepository.findByCandidateId(candidateId).stream()
                .map(this::mapToApplicationResponse)
                .collect(Collectors.toList());
    }

    private ApplicationResponse mapToApplicationResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .companyName(app.getJob().getCompanyName())
                .candidateId(app.getCandidate().getId())
                .candidateName(app.getCandidate().getFullName())
                .resumeUrl(app.getResumeUrl())
                .coverLetter(app.getCoverLetter())
                .status(app.getStatus())
                .appliedAt(app.getAppliedAt())
                .build();
    }
}
