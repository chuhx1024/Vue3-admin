<template>
  <a-button type="primary" :icon="h(PlusOutlined)" @click="showModal">新建用户</a-button>
  <a-modal v-model:open="open" title="新建用户" width="520px" @ok="onSubmit" @cancel="resetForm">
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-item label="用户名" name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="全名" name="full_name">
        <a-input v-model:value="formState.full_name" />
      </a-form-item>
      <a-form-item label="E-mail" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item has-feedback label="密码" name="password">
        <a-input v-model:value="formState.password" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="再次确认密码" name="confirm">
        <a-input v-model:value="formState.confirm" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="角色" name="roles">
        <a-checkbox-group v-model:value="formState.roles">
          <a-row :gutter="[0, 12]" justify="space-around">
            <a-col :span="8" v-for="item in plainOptions" :key="item.id">
              <a-checkbox :value="item.id">{{ item.rolename }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, h, reactive, toRaw, defineEmits } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { addUser } from '@/api/user'
import { getRoleList } from '@/api/role'
import { type IUserAddreq } from '@/api/types/user'
import { type IRoleRes } from '@/api/types/role'

interface FormState extends IUserAddreq {
  confirm?: string
}
const emit = defineEmits(['handleGetUserList'])

const formRef = ref()
const formState = reactive<FormState>({
  username: '',
  full_name: '',
  password: '',
  confirm: '',
  email: '',
  roles: [],
})
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password')
  } else {
    if (formState.confirm !== '') {
      formRef.value.validateFields('confirm')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  full_name: [{ required: true, message: '请输入全名', trigger: 'change' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    { type: 'email', message: '输入格式正确的邮箱' },
  ],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  confirm: [{ required: true, validator: validatePass2, trigger: 'change' }],
}
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
}
const plainOptions = ref<IRoleRes[]>([])

// 获取角色列表
const getRoles = async () => {
  const { code, data } = await getRoleList()
  if (code === 200) {
    plainOptions.value = data
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      console.log('values', formState, toRaw(formState))
      const rest = { ...formState }
      delete rest.confirm
      const { code, msg } = await addUser(rest)

      if (code === 200) {
        message.success('用户创建成功!')
        resetForm()
        open.value = false
        emit('handleGetUserList')
      } else {
        message.error(msg)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}
const resetForm = () => {
  formRef.value.resetFields()
}
const open = ref<boolean>(false)
const showModal = () => {
  open.value = true
  getRoles()
}
</script>

<style lang="scss" scoped>
.CreateUserModal-container {
  color: purple;
}
</style>
