<script setup lang="ts">
import MomentumView from '@/views/MomentumView.vue'
import logo from '@/assets/svg/logo.svg'
import { repository } from '../../../package.json'

const repositoryUrl = repository.url.replace('git+', '').replace('.git', '')
</script>

<template>
  <header class="header">
    <div class="header__logo-wrapper"><img :src="logo" alt="Momentum logo" /></div>
    <div class="header__title-wrapper">
      <h1>Momentum</h1>
    </div>
    <div></div>
  </header>
  <main class="main">
    <MomentumView />
  </main>
  <footer class="footer">
    <p>Anthony Pillot</p>
    <p>-</p>
    <p>
      <a :href="repositoryUrl">GitHub</a>
    </p>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue');

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  background-color: #333;
  color: white;
  font-family: 'Bebas Neue', sans-serif;

  z-index: 1;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.75);

  .header__logo-wrapper {
    margin-left: 1rem;

    img {
      background-color: whitesmoke;
      border-radius: 50%;
      width: 2rem;
    }
  }

  .header__title-wrapper {
    margin-left: -2rem;
  }
}

.main {
  padding: 2rem;
  background-color: purple; /* For browsers that do not support gradients */
  background-image: linear-gradient(to bottom right, darkslategray, purple);
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  background-color: #333;
  color: white;
  column-gap: 0.5rem;

  a {
    color: white;
  }
}
</style>
