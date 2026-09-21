import { useState } from 'react'

function TaskForm({ onCreateTask, isSubmitting }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setValidationMessage('Please enter a task title.')
      return
    }

    setValidationMessage('')

    try {
      await onCreateTask({
        title: trimmedTitle,
        description: description.trim(),
        completed: false,
      })
      setTitle('')
      setDescription('')
    } catch {
      // The page-level error message is supplied by useTasks.
    }
  }

  return (
    <section className="panel task-form-panel" aria-labelledby="add-task-heading">
      <div className="section-heading">
        <div>
          <p className="section-kicker">New work item</p>
          <h2 id="add-task-heading">Add a task</h2>
        </div>
        <span className="status-pill">Spring Boot API</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="task-title">Title</label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (validationMessage) setValidationMessage('')
            }}
            placeholder="e.g. Learn Docker Compose"
            maxLength="255"
            aria-describedby={validationMessage ? 'title-error' : undefined}
            aria-invalid={Boolean(validationMessage)}
            disabled={isSubmitting}
            required
          />
          {validationMessage && (
            <p id="title-error" className="field-error" role="alert">
              {validationMessage}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="task-description">
            Description <span>Optional</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a few details about this task"
            rows="3"
            disabled={isSubmitting}
          />
        </div>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding task…' : 'Add Task'}
        </button>
      </form>
    </section>
  )
}

export default TaskForm
