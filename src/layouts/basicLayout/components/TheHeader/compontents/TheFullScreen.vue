<template>
  <div @click="toFullOrExit">
    <a-tooltip placement="bottom">
      <template #title>
        <span v-if="isFull">退出全屏</span>
        <span v-else>全屏</span>
      </template>
      <a-button
        type="text"
        class="header-nav-btn"
        :icon="isFull ? h(FullscreenExitOutlined) : h(FullscreenOutlined)"
      />
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { ref, h } from 'vue'
// 全屏实现
const isFull = ref(false)
const requestFullScreen = () => {
  const de = document.documentElement
  if (de.requestFullscreen) {
    de.requestFullscreen()
  }
  // else if (de.mozRequestFullScreen) {
  //     de.mozRequestFullScreen()
  // } else if (de.webkitRequestFullScreen) {
  //     de.webkitRequestFullScreen()
  // }
}
const exitFullscreen = () => {
  const de = document
  if (de.exitFullscreen) {
    de.exitFullscreen()
  }
  // else if (de.mozCancelFullScreen) {
  //     de.mozCancelFullScreen()
  // } else if (de.webkitCancelFullScreen) {
  //     de.webkitCancelFullScreen()
  // }
}
const toFullOrExit = () => {
  isFull.value = !isFull.value
  if (isFull.value) {
    requestFullScreen()
  } else {
    exitFullscreen()
  }
}
</script>
