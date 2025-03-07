<template>
  <div class="filter-grid">
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
  </div>
</template>

<style scoped lang="scss">
.filter-grid {
  display: flex;
  margin-bottom: 8px;

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
</style>
