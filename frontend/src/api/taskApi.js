const TASKS_ENDPOINT = '/api/tasks'

async function request(url, options = {}) {
  let response

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
    })
  } catch {
    throw new Error('Unable to reach the backend service. Please make sure it is running.')
  }

  if (response.status === 204) {
    return null
  }

  const responseText = await response.text()
  let responseBody = null

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText)
    } catch {
      responseBody = null
    }
  }

  if (!response.ok) {
    const message = responseBody?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return responseBody
}

export function getTasks() {
  return request(TASKS_ENDPOINT)
}

export function getTaskById(id) {
  return request(`${TASKS_ENDPOINT}/${id}`)
}

export function createTask(task) {
  return request(TASKS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateTask(id, task) {
  return request(`${TASKS_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  })
}

export function deleteTask(id) {
  return request(`${TASKS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}
