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
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeProps } from 'ant-design-vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
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
