package com.jobportal.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private User employer;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String companyName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private Double salaryMin;
    private Double salaryMax;
    private String jobType;

    @ElementCollection
    private List<String> skills;

    private boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();
}
