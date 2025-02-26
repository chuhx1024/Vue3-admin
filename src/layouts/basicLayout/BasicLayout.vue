<template>
  <a-layout class="main-layout">
    <the-sider />
    <a-layout>
      <the-header />
      <the-main-app />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { TheHeader, TheSider, TheMainApp } from './components'
</script>
