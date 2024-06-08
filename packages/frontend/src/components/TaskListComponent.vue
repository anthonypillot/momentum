<script setup lang="ts">
import TaskCardComponent from '@/components/TaskCardComponent.vue'
import TaskModalComponent from '@/components/TaskModalComponent.vue'
import { useTaskStore } from '@/stores/task.store'
import type { Task } from '@/types/task.type'
import { computed } from 'vue'

const store = useTaskStore()
await store.fetchTasks()

const tasks = computed<Task[]>(() => store.tasks)

const isTasksEmpty = computed<boolean>(() => tasks.value.length === 0)

async function deleteAll(): Promise<void> {
  const confirmed: boolean = window.confirm('Are you sure you want to delete all tasks?')
  if (confirmed) {
    await store.deleteAllTasks()
    await store.fetchTasks()
  }
}
</script>

<template>
  <div class="task-list-header">
    <h1 style="color: white; font-family: 'Patrick Hand SC', sans-serif">Tasks list</h1>
    <button v-if="!isTasksEmpty" @click="deleteAll">Delete all tasks</button>
    <TaskModalComponent />
  </div>
  <div v-if="!isTasksEmpty" class="task-list-wrapper">
    <TaskCardComponent v-for="task in tasks" :key="task._id" :task="task" />
  </div>
  <div v-else>
    <p style="color: white">No tasks available.</p>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand');

.task-list-header {
  margin-bottom: 1rem;
}

.task-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1rem;
}
</style>
