<template>
  <a-layout class="main-layout">
    <a-layout-sider class="main-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { type MenuProps } from 'ant-design-vue'
import { siderbarRoutes, type siderbarRouteConfig } from '@/router/index'

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
const collapsed = ref<boolean>(false)

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
  .main-sider {
    text-align: center;
    line-height: 120px;
    color: #fff;
    background-color: #fff;
    .logo {
      height: 64px;
      background-color: #001529;
      padding: 16px;
    }
  }
  .main-content {
    max-height: calc(100vh - 64px);
    overflow: auto;
    padding: 10px;
  }
}
</style>
