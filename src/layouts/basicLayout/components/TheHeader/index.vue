<template>
  <a-layout-header class="TheHeader-container">
    <div class="header-left">
      <the-hamburger />
      <TheBreadcrumb />
    </div>
    <div class="header-right">
      <the-full-screen />
      <the-user-info-dropdown />
    </div>
  </a-layout-header>
</template>

<script lang="ts" setup>
import TheBreadcrumb from './compontents/TheBreadcrumb.vue'
import TheHamburger from './compontents/TheHamburger.vue'
import TheUserInfoDropdown from './compontents/TheUserInfoDropdown.vue'
import TheFullScreen from './compontents/TheFullScreen.vue'
</script>

<style lang="scss" scoped>
.TheHeader-container {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  :deep(.header-nav-btn) {
    font-size: 16px;
    width: 64px;
    height: 64px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    display: flex;
  }
}
</style>
