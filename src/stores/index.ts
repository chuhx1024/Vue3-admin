import { createPinia } from 'pinia'
import { useAppStore } from './modules/app/index'
import { useUserStore } from './modules/user/index'
import { usePermissionStore } from './modules/permission/index'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { useAppStore, useUserStore, usePermissionStore }
export default pinia
