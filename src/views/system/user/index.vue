<template>
  <a-layout class="user-layout">
    <a-layout-sider class="user-sider" :trigger="null" v-model:collapsed="collapsed" collapsible>
      <div
        class="sider-trigger"
        :style="{
          right: collapsed ? '-1px' : '-11px',
          'text-align': collapsed ? 'right' : 'center',
        }"
        @click="() => (collapsed = !collapsed)"
      >
        <RightOutlined style="font-size: 10px; transform: translateX(-2px)" v-if="collapsed" />
        <LeftOutlined v-else />
      </div>
      <Transition name="sider" mode="out-in">
        <div v-if="!collapsed" class="sider-content">
          <h3>部门列表</h3>
          <br />
          <a-tree :field-names="fieldNames" :tree-data="deptList"></a-tree>
        </div>
      </Transition>
    </a-layout-sider>
    <a-layout style="margin-left: 10px">
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <filter-grid>
          <template #left-title> 用户列表 </template>
          <template #right>
            <create-user-modal />
          </template>
        </filter-grid>
        <a-table :columns="columns" :data-source="userList">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'username'">
              <span>
                <smile-outlined />
                Name
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'username'">
              <a>
                {{ record.username }}
              </a>
            </template>
            <template v-else-if="column.key === 'roles'">
              <span>
                <a-tag
                  v-for="role in record.roles"
                  :key="role.id"
                  :color="
                    role.rolename === 'loser'
                      ? 'volcano'
                      : role.rolename.length > 5
                        ? 'geekblue'
                        : 'green'
                  "
                >
                  {{ role.rolename }}
                </a-tag>
              </span>
            </template>
          </template>
        </a-table>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import CreateUserModal from './components/CreateUserModal.vue'
import { message } from 'ant-design-vue'
import { getUserList } from '@/api/user'
import { getDeptList } from '@/api/dept'
import { type IUserRes } from '@/api/types/user'
const collapsed = ref<boolean>(false)

// const treeData: TreeProps['treeData'] = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
//           { title: 'leaf', key: '0-0-0-1' },
//         ],
//       },
//     ],
//   },
// ]
const fieldNames: TreeProps['fieldNames'] = {
  key: 'id',
  title: 'name',
}
const deptList = ref<TreeProps['treeData']>([])
const handleGetDeptList = async () => {
  const { code, msg, data } = await getDeptList()

  if (code === 200) {
    console.log(data, 123)
    deptList.value = data as any
  } else {
    message.error(msg)
  }
}

const columns = [
  {
    name: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
  },
  {
    title: '角色',
    key: 'roles',
    dataIndex: 'roles',
  },
]

const userList = ref<IUserRes[]>([])
const handlegetUserList = async () => {
  const { code, msg, data } = await getUserList()

  if (code === 200) {
    userList.value = data
  } else {
    message.error(msg)
  }
}

onMounted(() => {
  handlegetUserList()
  handleGetDeptList()
})
</script>
<style lang="scss" scoped>
.user-layout {
  height: 100%;
  :deep(.ant-layout-sider-collapsed) {
    flex: 0 0 0 !important;
    max-width: 0 !important;
    min-width: 0 !important;
    width: 0 !important;
  }
  .user-sider {
    background: #fff;
    border-radius: 5px;
    .sider-content {
      padding: 15px;
    }
    .sider-trigger {
      position: absolute;
      top: 50%;
      z-index: 1;
      width: 20px;
      height: 20px;
      line-height: 19px;
      text-align: right;
      cursor: pointer;
      background: #fff;
      border-radius: 50%;
      border: 1px solid #f5f6fb;
    }
  }
}
</style>
