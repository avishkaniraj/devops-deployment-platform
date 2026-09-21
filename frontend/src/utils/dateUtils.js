export function formatTaskDate(timestamp) {
  if (!timestamp) {
    return 'Date unavailable'
  }

  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
