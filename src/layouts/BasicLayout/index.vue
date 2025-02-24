

<template>
  <TheNav />
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>

<script setup lang="ts">
import { TheHeader, TheFooter, TheNav } from './compontents/index'
</script>
