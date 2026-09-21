import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, emptyMessage, onUpdateTask, onDeleteTask, updatingIds, deletingIds }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">✓</div>
        <h3>No tasks here</h3>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          isUpdating={updatingIds.includes(task.id)}
          isDeleting={deletingIds.includes(task.id)}
        />
      ))}
    </div>
  )
}

export default TaskList
