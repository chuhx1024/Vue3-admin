<template>
  <a-form
    class="login-form"
    :model="formState"
    name="logingroup"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 10, span: 8 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { login } from '@/api/login'
import { message } from 'ant-design-vue'
import { setToken } from '@/utils/handleCookie'
import { useUserStore } from '@/stores/modules/user'
import addDynamicRoutes from '@/router/premission'

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const router = useRouter() // 初始化路由器实例

const userStore = useUserStore()
const onFinish = async (values: FormState) => {
  console.log('Success:', values)
  const { username, password } = values
  const { code, msg, data } = await login({ username, password })

  if (code === 200) {
    message.info('登录成功!')
    const { access_token, token_type } = data
    setToken(access_token, token_type)
    await addDynamicRoutes()
    const { id, getUserInfo } = userStore
    !id && (await getUserInfo())
    router.push('/') // 使用 router.push 进行页面跳转
  } else {
    message.error(msg)
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style scoped lang="scss">
.login-form {
  width: 500px;
}
</style>
