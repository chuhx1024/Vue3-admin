<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-style">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.app-style {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
