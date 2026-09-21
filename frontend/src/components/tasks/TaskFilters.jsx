const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filters" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={activeFilter === filter.value ? 'filter-button filter-button--active' : 'filter-button'}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters
