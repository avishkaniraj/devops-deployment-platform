package com.deploymentplatform.backend.service;

import com.deploymentplatform.backend.dto.TaskRequest;
import com.deploymentplatform.backend.dto.TaskResponse;

import java.util.List;

public interface TaskService {

    List<TaskResponse> getAllTasks();

    TaskResponse getTaskById(Long id);

    TaskResponse createTask(TaskRequest request);

    TaskResponse updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);
}
