import { defineStore } from 'pinia'
import piniaStore from '@/stores/index'
import { type PermissionState } from './types'
import { getUserMenu } from '@/api/login'
import { permissionRouters, baseRoutes } from '@/router/index'

export const usePermissionStore = defineStore(
  // 唯一ID
  'permission',
  {
    state: (): PermissionState => ({
      accessRoutes: [],
    }),
    getters: {
      routes(): any {
        return baseRoutes.concat(this.accessRoutes)
      },
      sidebar(): any {
        return baseRoutes[0].children?.concat(this.accessRoutes[0].children)
      },
      menus() {
        return permissionRouters[0].children
      },
    },
    actions: {
      async generateRoutes() {
        const { data } = await getUserMenu() // 调用接口获取后端传来的菜单路由
        console.log(data)
        this.accessRoutes = permissionRouters
        return this.accessRoutes
      },
    },
    persist: [
      {
        key: 'permission-state', // 持久化存储的 key
        storage: localStorage, // 存储方式
      },
    ],
  },
)
export function usePermissionOutsideStore() {
  return usePermissionStore(piniaStore)
}
