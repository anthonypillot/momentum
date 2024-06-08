<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import type { Task } from '@/types/task.type'

const store = useTaskStore()

const props = defineProps<{
  task: Task
}>()

const statusRecord: Record<string, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done'
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString()
}

async function openModal(task: Task): Promise<void> {
  store.selectedTask = task
  store.toggleModal()
}

async function deleteTask(id: string | undefined): Promise<void> {
  if (id) {
    console.debug('Deleting task with ID:', id)
    const confirmed: boolean = window.confirm('Are you sure you want to delete this task?')
    if (confirmed) {
      await store.deleteTask(id)
      await store.fetchTasks()
    }
  } else {
    window.alert("The task doesn't have an ID, deletion is impossible.")
  }
}
</script>

<template>
  <div class="task-item">
    <div>
      <h2>{{ props.task.title }}</h2>
    </div>
    <div v-if="props.task.description">
      <p>{{ props.task.description }}</p>
    </div>
    <div>
      <hr class="rounded" />
    </div>
    <div>
      <p>Status: {{ statusRecord[props.task.status] }}</p>
    </div>
    <div class="task-item__time">
      <p class="task-item__time__text">Created at: {{ formatDate(props.task.createdAt) }}</p>
      <p class="task-item__time__text">Updated at: {{ formatDate(props.task.updatedAt) }}</p>
    </div>
    <div class="task-item__action-button">
      <button @click="openModal(props.task)">Update</button>
      <button @click="deleteTask(props.task._id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: whitesmoke;
  position: relative;

  .task-item__time {
    margin-bottom: 2rem;

    .task-item__time__text {
      font-size: 0.75rem;
      color: #666;
    }
  }

  .task-item__action-button {
    display: flex;
    gap: 0.5rem;

    position: absolute;
    bottom: 1rem;
  }
}

/* Rounded border */
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
</style>
