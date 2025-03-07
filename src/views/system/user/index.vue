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
          <a-tree :tree-data="treeData"></a-tree>
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
        <a-table :columns="columns" :data-source="data">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <smile-outlined />
                Name
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>
            <template v-else-if="column.key === 'tags'">
              <span>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">
                  More actions
                  <down-outlined />
                </a>
              </span>
            </template>
          </template>
        </a-table>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
import CreateUserModal from './components/CreateUserModal.vue'
const collapsed = ref<boolean>(false)

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-02',
    children: [
      {
        title: 'parent 1-02',
        key: '0-0-02',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-20', disableCheckbox: true },
          { title: 'leaf', key: '0-0-02-1' },
        ],
      },
      {
        title: 'parent 1-21',
        key: '0-0-21',
        children: [{ key: '0-0-1-20', title: 'sss' }],
      },
    ],
  },
]
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]
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
