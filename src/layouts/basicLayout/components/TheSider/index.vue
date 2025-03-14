<template>
  <a-layout-sider
    class="the-sider-container"
    v-model:collapsed="menuCollapse"
    :trigger="null"
    collapsible
  >
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="menuItems"
      @click="handleMenuItemClick"
    >
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { type MenuProps } from 'ant-design-vue'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import { type siderbarRouteConfig } from '@/router/index'
// 获取 Store 实例
const appStore = useAppStore()

// 使用 storeToRefs 解构 state，确保响应式
const { menuCollapse } = storeToRefs(appStore)

const selectedKeys = ref<string[]>([])

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
const { sidebar } = usePermissionStore()
// const menuItems = createItems(sidebar)
const menuItems = computed(() => createItems(sidebar))

const router = useRouter()
const handleMenuItemClick: MenuProps['onClick'] = (e) => {
  router.push(String(e.key))
}

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

<style lang="scss" scoped>
.the-sider-container {
  color: #fff;
  background-color: #fff;
  .logo {
    background-color: #1f1f1f;
    padding: 16px;
    height: 32px;
    margin: 16px;
  }
}
</style>
