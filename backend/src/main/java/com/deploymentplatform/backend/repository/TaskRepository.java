package com.deploymentplatform.backend.repository;

import com.deploymentplatform.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
