<template>
  <a-breadcrumb class="breadcrumb-container">
    <transition-group name="breadcrumb" tag="div">
      <a-breadcrumb-item v-for="(item, index) in breadcrumbRoutes" :key="item.path || index">
        <component
          :is="index === breadcrumbRoutes.length - 1 ? 'span' : 'router-link'"
          v-if="item.path !== ''"
          :to="item.path"
        >
          {{ item.label }}
        </component>
        <span v-else>{{ route.meta.label }}</span>
      </a-breadcrumb-item>
    </transition-group>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
  path: string
  label: string
}

const route = useRoute()
const breadcrumbRoutes = ref<BreadcrumbItem[]>([])

const generateBreadcrumb = () => {
  const matchedRoutes = route.matched.filter((route) => route.meta && route.meta.label)

  breadcrumbRoutes.value = matchedRoutes.map((route) => ({
    path: route.path,
    label: route.meta.label as string,
  }))
  // 只有在当前路由不是首页时才添加首页的面包屑项
  if (route.path !== '/dashboard') {
    breadcrumbRoutes.value.unshift({ path: '/', label: 'Dashboard' })
  }
}

watch(
  () => route.path,
  () => {
    generateBreadcrumb()
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  span {
    display: inline-block;
    color: #97a8be;
    left: 0;
    cursor: text;
  }
}
</style>
