function TaskStats({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length
  const remaining = tasks.length - completed

  return (
    <section className="stats-grid" aria-label="Task statistics">
      <div className="stat-card">
        <span className="stat-label">Total tasks</span>
        <strong>{tasks.length}</strong>
        <span className="stat-accent stat-accent--blue" />
      </div>
      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <strong>{completed}</strong>
        <span className="stat-accent stat-accent--green" />
      </div>
      <div className="stat-card">
        <span className="stat-label">Remaining</span>
        <strong>{remaining}</strong>
        <span className="stat-accent stat-accent--amber" />
      </div>
    </section>
  )
}

export default TaskStats
