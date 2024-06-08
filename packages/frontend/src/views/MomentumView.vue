<script setup lang="ts">
import TaskListComponent from '@/components/TaskListComponent.vue'
import TaskCreationComponent from '@/components/TaskCreationComponent.vue'
import { onErrorCaptured, ref } from 'vue'

onErrorCaptured((error: Error) => {
  console.error('An error occurred in FormView:', error)
  errorOccured.value = true
})

const errorOccured = ref<boolean>(false)

function refresh(): void {
  window.location.reload()
}
</script>

<template>
  <div class="momentum-view">
    <section class="momentum-view__creation">
      <TaskCreationComponent />
    </section>
    <section v-if="!errorOccured" class="momentum-view__list">
      <Suspense>
        <TaskListComponent />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </section>
    <section v-else class="error">
      <p>An error occurred. Please try again later.</p>
      <button @click="refresh()">Refresh</button>
    </section>
  </div>
</template>

<style scoped>
.momentum-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .momentum-view__creation {
    min-width: 20rem;
  }
}

.momentum-view__list {
}

.error {
  padding: 1rem;
  border: 1px solid #ff0000;
  border-radius: 0.5rem;
  color: #ff0000;
}
</style>
