<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import type { Task } from '@/types/task.type'

const store = useTaskStore()

const task: Task = {
  title: '',
  description: '',
  status: 'todo',
  createdAt: new Date(),
  updatedAt: new Date()
}

async function createTask(): Promise<void> {
  const now = new Date()
  await store.createTask({ ...task, createdAt: now, updatedAt: now })
  await store.fetchTasks()
}
</script>

<template>
  <h1 style="color: white; font-family: 'Patrick Hand SC', sans-serif">Create a new task</h1>
  <section>
    <form class="form" @submit.prevent="createTask()">
      <div class="form__element">
        <label for="title">Title</label>
        <input
          class="form__element__input"
          type="text"
          id="title"
          v-model="task.title"
          required
          placeholder="Buy some milk"
        />
      </div>

      <div class="form__element">
        <label for="description">Description</label>
        <textarea
          class="form__element__input"
          id="description"
          v-model="task.description"
          placeholder="Buy some milk at the grocery store. Don't forget to check the expiration date."
          cols="10"
          rows="5"
        />
      </div>

      <div class="form__element">
        <label for="status">Status</label>
        <select class="form__element__input" id="status" v-model="task.status">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div class="form__action-button">
        <button type="submit">Create</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC');

.form {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  gap: 1rem;
  background-color: whitesmoke;

  .form__element {
    display: flex;
    flex-direction: column;

    textarea {
      resize: vertical;
    }

    .form__element__input {
      padding: 0.5rem;
    }
  }

  .form__action-button {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
