import { createApp } from 'vue'
import pinia from '@/stores'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import App from './App.vue'
import { setupRouter } from './router'

const setupApp = async () => {
  const app = createApp(App)
  app.use(pinia)
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
