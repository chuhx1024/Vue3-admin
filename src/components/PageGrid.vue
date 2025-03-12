<template>
  <div
    class="page-grid"
    :style="{ 'background-color': theme === 'transparent' ? 'transparent' : '#fff' }"
  >
    <header
      class="filter-grid"
      v-if="hasLeftSearchSlot || hasLeftTitleSlot || hasRightSlot"
      :style="{ padding: theme === 'transparent' ? ' 10px 20px 20px 20px' : '20px 20px 0 20px' }"
    >
      <div class="wrap-left">
        <slot name="left-search"></slot>
        <div class="left-title">
          <slot name="left-title"></slot>
        </div>
      </div>
      <div class="wrap-btns">
        <a-space>
          <slot name="right"></slot>
        </a-space>
      </div>
    </header>
    <main class="content-grid">
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useSlots } from 'vue'
// 传递 'transparent' 时，背景色为透明
defineProps({
  theme: {
    type: String,
    default: '',
  },
})
const slots = useSlots()

const hasLeftSearchSlot = !!slots['left-search']
const hasLeftTitleSlot = !!slots['left-title']
const hasRightSlot = !!slots['right']
</script>

<style scoped lang="scss">
.page-grid {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #000;
  overflow: auto;
  .filter-grid {
    display: flex;
    align-items: center;
    padding: 0 20px 10px 20px;
    .wrap-left {
      flex: 1;

      .left-title {
        color: #1e2d55;
        font-weight: 400;
        font-size: 24px;
      }

      :deep(.ant-form-item-label) {
        line-height: 32px;
      }

      :deep(.ant-form-item-control) {
        margin-top: 0;
        line-height: 32px;
      }
    }

    .wrap-btns {
      width: fit-content;
    }
  }
  .content-grid {
    background: #fff;
    padding: 20px;
    flex: 1;
    border-radius: 5px;
  }
}
</style>
