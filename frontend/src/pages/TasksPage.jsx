import { useState } from 'react'
import TaskFilters from '../components/tasks/TaskFilters.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskStats from '../components/tasks/TaskStats.jsx'
import useTasks from '../hooks/useTasks.js'

function TasksPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const {
    tasks,
    loading,
    error,
    creating,
    updatingIds,
    deletingIds,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks,
  } = useTasks()

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'active') return !task.completed
    if (activeFilter === 'completed') return task.completed
    return true
  })

  return (
    <div className="tasks-page">
      <TaskForm onCreateTask={createTask} isSubmitting={creating} />

      {error && (
        <div className="error-banner" role="alert">
          <div>
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
          <button type="button" onClick={refreshTasks} disabled={loading}>
            {loading ? 'Retrying…' : 'Retry'}
          </button>
        </div>
      )}

      <TaskStats tasks={tasks} />

      <section className="panel tasks-panel" aria-labelledby="tasks-heading">
        <div className="tasks-toolbar">
          <div>
            <p className="section-kicker">Your workflow</p>
            <h2 id="tasks-heading">Tasks</h2>
          </div>
          <TaskFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {loading ? (
          <div className="loading-state" role="status">
            <span className="loading-spinner" aria-hidden="true" />
            <p>Loading tasks from the backend…</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            emptyMessage={
              activeFilter === 'all'
                ? 'No tasks yet. Create your first task above.'
                : `No ${activeFilter} tasks. Select another filter to view your tasks.`
            }
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            updatingIds={updatingIds}
            deletingIds={deletingIds}
          />
        )}
      </section>
    </div>
  )
}

export default TasksPage
