<template>
  <a-layout-header class="TheHeader-container">
    <div class="header-left">
      <the-hamburger />
      <TheBreadcrumb />
    </div>
    <the-user-info-dropdown />
  </a-layout-header>
</template>

<script lang="ts" setup>
import TheBreadcrumb from './compontents/TheBreadcrumb.vue'
import TheHamburger from './compontents/TheHamburger.vue'
import TheUserInfoDropdown from './compontents/TheUserInfoDropdown.vue'
</script>

<style lang="scss" scoped>
.TheHeader-container {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0;
  .header-left {
    display: flex;
    align-items: center;
  }
}
</style>
