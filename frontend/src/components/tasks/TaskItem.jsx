import { formatTaskDate } from '../../utils/dateUtils.js'

function TaskItem({ task, onUpdateTask, onDeleteTask, isUpdating, isDeleting }) {
  const isBusy = isUpdating || isDeleting

  async function handleStatusChange() {
    try {
      await onUpdateTask(task.id, {
        title: task.title,
        description: task.description || '',
        completed: !task.completed,
      })
    } catch {
      // The existing task remains unchanged and the page displays the API error.
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete “${task.title}”?`)
    if (!confirmed) return

    try {
      await onDeleteTask(task.id)
    } catch {
      // The task remains visible and the page displays the API error.
    }
  }

  return (
    <article className={`task-card${task.completed ? ' task-card--completed' : ''}`}>
      <div className="task-card-main">
        <label className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleStatusChange}
            disabled={isBusy}
            aria-label={`Mark ${task.title} as ${task.completed ? 'active' : 'completed'}`}
          />
          <span aria-hidden="true">✓</span>
        </label>

        <div className="task-content">
          <div className="task-title-row">
            <h3>{task.title}</h3>
            <span className={`task-state task-state--${task.completed ? 'completed' : 'active'}`}>
              {task.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          {task.description && <p className="task-description">{task.description}</p>}
          <p className="task-date">Created {formatTaskDate(task.createdAt)}</p>
        </div>
      </div>

      <button
        className="delete-button"
        type="button"
        onClick={handleDelete}
        disabled={isBusy}
        aria-label={`Delete ${task.title}`}
      >
        {isDeleting ? 'Deleting…' : 'Delete'}
      </button>
    </article>
  )
}

export default TaskItem
