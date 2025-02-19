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
  border-radius: 8;
  overflow: 'hidden';
  width: '100vw';
  height: '100vh';
}
</style>
