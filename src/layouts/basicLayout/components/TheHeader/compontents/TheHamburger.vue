<template>
  <a-button
    type="text"
    class="Hamburger-container"
    :icon="menuCollapse ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined)"
    @click="() => toggleMenuCollapse()"
  />
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/stores/modules/app'
// 获取 Store 实例
const appStore = useAppStore()

// 使用 storeToRefs 解构 state，确保响应式
const { menuCollapse } = storeToRefs(appStore)

// 直接使用 actions
const { toggleMenuCollapse } = appStore
</script>

<style lang="scss" scoped>
.Hamburger-container {
  font-size: 16px;
  width: 64px;
  height: 64px;
}
</style>
