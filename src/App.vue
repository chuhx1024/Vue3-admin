<script setup lang="ts">
import { ref, onMounted } from 'vue';
import themeJson from '@/styles/theme/Ant Design Vue Theme.json';

// 定义一个响应式变量来存储主题配置
const theme = ref({
  token: {
    colorPrimary: '#00b96b', // 默认值
  },
});

onMounted(() => {
  // 动态加载 JSON 文件中的主题配置
  if (themeJson && themeJson.token) {
    theme.value.token = themeJson.token;
  }
});

</script>

<template>
<a-config-provider
    :theme="theme"
  >
  <div class="app-style">
    <RouterView />
  </div>
  </a-config-provider>
</template>

<style scoped lang="scss">
.app-style {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
