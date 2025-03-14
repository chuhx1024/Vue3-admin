<template>
  <a-dropdown class="UserInfoDropdown-container">
    <a href="javascript:void(0)">
      <a-space>
        <a-avatar style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <span>{{ username }}</span>
        <DownOutlined />
      </a-space>
    </a>
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="1"><a href="javascript:void(0)">退出登录</a></a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { type MenuProps } from 'ant-design-vue'
import { removeCookie } from '@/utils/handleCookie'
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'
const router = useRouter()
const { username } = useUserStore()

const loginOut = () => {
  removeCookie()
  useUserStore().$reset()
  usePermissionStore().$reset()
  router.push('/login')
}
const onClick: MenuProps['onClick'] = ({ key }) => {
  if (key === '1') {
    loginOut()
  }
}
</script>

<style lang="scss" scoped>
.UserInfoDropdown-container {
  padding: 0 12px;
}
</style>
