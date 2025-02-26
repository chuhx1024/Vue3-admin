<template>
  <a-button
    type="text"
    class="Hamburger-container"
    :icon="collapsed ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined)"
    @click="() => (collapsed = !collapsed)"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const collapsed = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.Hamburger-container {
  font-size: 16px;
  width: 64px;
  height: 64px;
}
</style>
