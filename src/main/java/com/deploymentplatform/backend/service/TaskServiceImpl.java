package com.deploymentplatform.backend.service;

import com.deploymentplatform.backend.dto.TaskRequest;
import com.deploymentplatform.backend.dto.TaskResponse;
import com.deploymentplatform.backend.exception.TaskNotFoundException;
import com.deploymentplatform.backend.model.Task;
import com.deploymentplatform.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        return toResponse(findTaskById(id));
    }

    @Override
    @Transactional
    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task();
        updateEntity(task, request);
        return toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = findTaskById(id);
        updateEntity(task, request);
        return toResponse(taskRepository.save(task));
    }

    @Override
    @Transactional
    public void deleteTask(Long id) {
        Task task = findTaskById(id);
        taskRepository.delete(task);
    }

    private Task findTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    private void updateEntity(Task task, TaskRequest request) {
        task.setTitle(request.getTitle().trim());
        task.setDescription(request.getDescription());
        task.setCompleted(request.isCompleted());
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getCreatedAt()
        );
    }
}
