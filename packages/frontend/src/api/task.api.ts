import type { Task } from '@/types/task.type'

export async function getTasks(): Promise<Task[]> {
  const response: Response = await fetch('/api/tasks')

  if (response.status === 200) {
    console.debug('All tasks fetched')
    return await response.json()
  } else {
    throw new Error('Failed to fetch tasks')
  }
}

export async function createTask(task: Task): Promise<Task> {
  const response: Response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (response.status === 201) {
    console.debug('Task created')
    return await response.json()
  } else {
    throw new Error('Failed to create task')
  }
}

export async function updateTask(task: Task): Promise<Task> {
  const response: Response = await fetch('/api/tasks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (response.status === 200) {
    console.debug('Task updated')
    return await response.json()
  } else {
    throw new Error('Failed to create task')
  }
}

export async function deleteAllTasks(): Promise<true> {
  const response: Response = await fetch('/api/tasks', {
    method: 'DELETE'
  })

  if (response.status === 204) {
    console.debug('All tasks deleted')
    return true
  } else {
    throw new Error('Failed to delete all tasks')
  }
}

export async function deleteTask(id: string): Promise<true> {
  const response: Response = await fetch('/api/tasks/' + id, {
    method: 'DELETE'
  })

  if (response.status === 204) {
    console.debug('Task deleted')
    return true
  } else {
    throw new Error('Failed to delete task')
  }
}
