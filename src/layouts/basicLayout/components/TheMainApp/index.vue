<template>
  <a-layout-content class="the-main-app-container">
    <transition name="fade-transform" mode="out-in">
      <RouterView :key="route.path" />
    </transition>
  </a-layout-content>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style lang="scss" scoped>
.the-main-app-container {
  height: calc(100vh - 64px);
  overflow: auto;
  padding: 10px;
}
</style>
