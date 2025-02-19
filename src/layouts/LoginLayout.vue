<template>
  <a-layout :style="layoutStyle">
    <a-layout-content :style="contentStyle">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import type { CSSProperties } from 'vue'
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1e1e1e',
}

const layoutStyle: CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: '100%',
}
</script>
