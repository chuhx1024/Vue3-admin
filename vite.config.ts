import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        // 其他需要自动导入的库
      ],
      dts: 'src/auto-imports.d.ts', // 生成自动导入的类型声明文件
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true, // 启用图标解析
        }), // 自动解析 Ant Design Vue 组件
      ],
      dts: 'src/components.d.ts', // 生成组件的类型声明文件
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/variables' as vars;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '/api'),
      },
    },
  },
})
