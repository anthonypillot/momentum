<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import type { Task } from '@/types/task.type'

const store = useTaskStore()

async function update(task: Task) {
  const confirmed = window.confirm('Are you sure you want to update this task?')

  if (confirmed) {
    await store.updateTask(task)
    await store.fetchTasks()
    store.toggleModal()
  }
}
</script>

<template>
  <div v-if="store.selectedTask" :class="{ 'task-modal__background': store.isModalOpen }">
    <Transition>
      <div v-if="store.isModalOpen" class="task-modal__window">
        <section class="task-modal__window__content">
          <div class="task-modal__window__content__element">
            <label for="title">Title</label>
            <input
              class="task-modal__window__content__element__input"
              type="text"
              id="title"
              v-model="store.selectedTask.title"
              required
              placeholder="Buy some milk"
            />
          </div>

          <div class="task-modal__window__content__element">
            <label for="description">Description</label>
            <textarea
              class="task-modal__window__content__element__input"
              id="description"
              v-model="store.selectedTask.description"
              placeholder="Buy some milk at the grocery store. Don't forget to check the expiration date."
              cols="10"
              rows="5"
            />
          </div>

          <div class="task-modal__window__content__element">
            <label for="status">Status</label>
            <select class="task-modal__window__content__element__input" id="status" v-model="store.selectedTask.status">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div class="task-modal__window__content__action-button">
            <button @click="update(store.selectedTask)">Update</button>
            <button @click="store.toggleModal">Cancel</button>
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.task-modal__background {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
}

.task-modal__window {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 40rem;

  background-color: whitesmoke;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;

  .task-modal__window__content {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;

    .task-modal__window__content__element {
      display: flex;
      flex-direction: column;

      textarea {
        resize: vertical;
      }

      .task-modal__window__content__element__input {
        padding: 0.5rem;
      }
    }

    .task-modal__window__content__action-button {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
