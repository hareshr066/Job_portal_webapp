package com.jobportal.backend.repository;

import com.jobportal.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}

package com.jobportal.backend.repository;

import com.jobportal.backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, UUID> {
    List<Job> findByActiveTrue();
    List<Job> findByEmployerId(UUID employerId);
}

package com.jobportal.backend.repository;

import com.jobportal.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    List<Application> findByCandidateId(UUID candidateId);
    List<Application> findByJobId(UUID jobId);
}
