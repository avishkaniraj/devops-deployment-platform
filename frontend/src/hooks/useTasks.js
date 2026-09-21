import { useCallback, useEffect, useState } from 'react'
import * as taskApi from '../api/taskApi.js'

export default function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [updatingIds, setUpdatingIds] = useState([])
  const [deletingIds, setDeletingIds] = useState([])

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const loadedTasks = await taskApi.getTasks()
      setTasks(loadedTasks)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  async function createTask(task) {
    setCreating(true)
    setError('')

    try {
      const createdTask = await taskApi.createTask(task)
      setTasks((currentTasks) => [...currentTasks, createdTask])
      return createdTask
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setCreating(false)
    }
  }

  async function updateTask(id, task) {
    setUpdatingIds((ids) => [...ids, id])
    setError('')

    try {
      const updatedTask = await taskApi.updateTask(id, task)
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === id ? updatedTask : currentTask,
        ),
      )
      return updatedTask
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setUpdatingIds((ids) => ids.filter((taskId) => taskId !== id))
    }
  }

  async function deleteTask(id) {
    setDeletingIds((ids) => [...ids, id])
    setError('')

    try {
      await taskApi.deleteTask(id)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    } finally {
      setDeletingIds((ids) => ids.filter((taskId) => taskId !== id))
    }
  }

  return {
    tasks,
    loading,
    error,
    creating,
    updatingIds,
    deletingIds,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: loadTasks,
  }
}
