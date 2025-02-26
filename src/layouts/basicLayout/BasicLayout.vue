<template>
  <a-layout class="main-layout">
    <a-layout-sider class="main-sider" v-model:collapsed="menuCollapse" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :items="menuItems"
        @click="handleMenuItemClick"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <the-header />
      <a-layout-content class="main-content">
        <transition name="fade-transform" mode="out-in">
          <RouterView :key="route.path" />
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue'
import { type MenuProps } from 'ant-design-vue'

import { siderbarRoutes, type siderbarRouteConfig } from '@/router/index'
import { TheHeader } from './components'

const createItems = (routes: siderbarRouteConfig[]): MenuProps['items'] => {
  return routes
    .filter((route) => !route?.meta.hidden)
    .map((item) => {
      return {
        key: item.path,
        icon: () => h(item.meta.icon),
        label: item.meta.label,
        children: item.children ? createItems(item.children) : undefined,
      }
    })
}
const menuItems = createItems(siderbarRoutes)

const router = useRouter()
const handleMenuItemClick: MenuProps['onClick'] = (e) => {
  router.push(String(e.key))
}

const selectedKeys = ref<string[]>([])
import { useAppStore } from '@/stores/modules/app'
// 获取 Store 实例
const appStore = useAppStore()

// 使用 storeToRefs 解构 state，确保响应式
const { menuCollapse } = storeToRefs(appStore)

// 监听路由 设置高亮显示
const route = useRoute()
watch(
  () => route.path,
  (newValue) => {
    selectedKeys.value = []
    selectedKeys.value.push(newValue)
  },
  {
    immediate: true, // 立即执行
  },
)
</script>
<style scoped lang="scss">
.main-layout {
  .main-sider {
    // text-align: center;
    // line-height: 120px;
    color: #fff;
    background-color: #fff;
    .logo {
      background-color: #1f1f1f;
      padding: 16px;
      height: 32px;
      margin: 16px;
    }
  }
  .main-content {
    height: calc(100vh - 64px);
    overflow: auto;
    padding: 10px;
  }
}
</style>
