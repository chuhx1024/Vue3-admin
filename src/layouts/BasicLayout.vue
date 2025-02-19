<template>
  <a-layout class="main-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="main-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content class="main-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { Layout, LayoutHeader, LayoutContent, LayoutSider, Menu, MenuItem } from 'ant-design-vue'
const ALayout = Layout
const ALayoutHeader = LayoutHeader
const ALayoutSider = LayoutSider
const ALayoutContent = LayoutContent
const AMenu = Menu
const AMenuItem = MenuItem
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
</script>
<style scoped lang="scss">
.main-layout {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .main-header {
    background: #fff;
    padding: 0;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .main-content {
    max-height: calc(100vh - 64px);
    overflow: auto;
    padding: 10px;
  }
}
</style>
