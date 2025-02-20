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
        <a-button
          type="text"
          class="trigger"
          :icon="collapsed ? h(MenuUnfoldOutlined) : h(MenuFoldOutlined)"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown class="user-info">
          <a href="javascript:void(0)">
            <a-space>
              <a-avatar style="background-color: #87d068">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <span>Admin</span>
              <DownOutlined />
            </a-space>
          </a>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item key="1"><a href="javascript:void(0)">退出登录</a></a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="main-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue'
import { type MenuProps } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { siderbarRoutes, type siderbarRouteConfig } from '@/router/index'
import { removeCookie } from '@/utils/handleCookie'

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

const loginOut = () => {
  removeCookie()
  router.push('/login')
}
const onClick: MenuProps['onClick'] = ({ key }) => {
  if (key === '1') {
    loginOut()
  }
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
<style scoped lang="scss">
.main-layout {
  .main-header {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0;
    .trigger {
      font-size: 16px;
      width: 64px;
      height: 64px;
    }
    .user-info {
      padding: 0 12px;
    }
  }
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
