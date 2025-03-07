<template>
  <div class="dashboard">
    <a-card>
      <div class="dashboard-welcome">
        <div class="dashboard-welcome-left">
          <a-space size="middle">
            <a-avatar
              :size="64"
              src="https://img0.baidu.com/it/u=886569661,3124996234&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
            >
            </a-avatar>
            <div>
              <p text-20 font-semibold>hello, {{}}</p>
              <p mt-5 text-14 op-60>今天又是元气满满的一天</p>
            </div>
          </a-space>
        </div>
        <a-space>
          <a-statistic
            v-for="item in statisticData"
            :key="item.id"
            :title="item.label"
            :value="item.value"
          />
        </a-space>
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const statisticData = computed(() => [
  {
    id: 0,
    label: '项目数',
    value: '25',
  },
  {
    id: 1,
    label: '待办',
    value: '4/16',
  },
  {
    id: 2,
    label: '消息',
    value: '12',
  },
])
</script>
<style lang="scss" scoped>
.dashboard {
  color: vars.$colorPrimary;
  .dashboard-welcome {
    display: flex;
    justify-content: space-between;
    .dashboard-welcome-left {
      display: flex;
    }
  }
}
</style>
