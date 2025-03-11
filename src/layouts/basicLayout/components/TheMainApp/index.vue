<template>
  <a-layout-content class="the-main-app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-layout-content>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.the-main-app-container {
  height: calc(100vh - 64px);
  overflow: auto;
  padding: 10px;
  background-color: vars.$bodyBackground;
}
</style>
