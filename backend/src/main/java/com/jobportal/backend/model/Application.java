package com.jobportal.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"job_id", "candidate_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    @Column(nullable = false)
    private String resumeUrl;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private LocalDateTime appliedAt = LocalDateTime.now();
}
