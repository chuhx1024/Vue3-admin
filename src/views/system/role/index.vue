<template>
  <page-grid>
    <template #left-title> 角色列表 </template>
    <template #right>
      <a-button type="primary" :icon="h(PlusOutlined)">新建用户</a-button>
    </template>
    <a-table :columns="columns" :data-source="roleList">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button type="primary" size="small" @click="showDrawer">
              <template #icon><FormOutlined /> </template>
              <span>设置权限</span>
            </a-button>
          </span>
        </template>
      </template>
    </a-table>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="设置权限"
      placement="right"
    >
      <template #extra>
        <a-space>
          <a-button type="primary">Submit</a-button>
        </a-space>
      </template>
      <a-tabs>
        <a-tab-pane key="1" tab="菜单权限">
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            :field-names="fieldNames"
            :tree-data="treeData"
          >
            <template #title="{ title, key }">
              <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
              <template v-else>{{ title }}</template>
            </template>
          </a-tree>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </page-grid>
</template>
<script lang="ts" setup>
import { ref, onMounted, h } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TreeProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { getRoleList } from '@/api/role'
import { type IRoleRes } from '@/api/types/role'
import { usePermissionStore } from '@/stores/modules/permission'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '角色名称',
    dataIndex: 'rolename',
    key: 'rolename',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const roleList = ref<IRoleRes[]>([])
// 获取角色列表
const getRoles = async () => {
  const { code, data, msg } = await getRoleList()
  if (code === 200) {
    roleList.value = data
  } else {
    message.error(msg)
  }
}

const open = ref(false)
const showDrawer = () => {
  open.value = true
}
const { menus } = usePermissionStore()

const createItems = (menus: any[]): TreeProps['treeData'] => {
  return menus
    .filter((route) => !route?.meta.hidden)
    .map((item) => {
      return {
        key: item.meta.key,
        title: item.meta.label,
        children: item.children ? createItems(item.children) : undefined,
      }
    })
}

const treeData: TreeProps['treeData'] = createItems(menus)

const expandedKeys = ref<string[]>(['0-0-0', '0-0-1'])
const selectedKeys = ref<string[]>(['0-0-0', '0-0-1'])
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1'])
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys)
})
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
})

onMounted(() => {
  getRoles()
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
