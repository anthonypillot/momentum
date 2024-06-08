import { createTask, deleteAllTasks, deleteTask, getTasks, updateTask } from '@/api/task.api'
import type { Task } from '@/types/task.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])

  async function fetchTasks(): Promise<void> {
    const data = await getTasks()
    // sort using updatedAt date
    tasks.value = data.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }

  const selectedTask = ref<Task | null>(null)

  const isModalOpen = ref<boolean>(false)
  function toggleModal(): void {
    isModalOpen.value = isModalOpen.value ? false : true
  }

  return {
    tasks,
    fetchTasks,
    createTask,
    deleteTask,
    deleteAllTasks,
    isModalOpen,
    toggleModal,
    selectedTask,
    updateTask
  }
})
