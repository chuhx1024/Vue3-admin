import { defineStore } from 'pinia'
import piniaStore from '@/stores/index'
import { type PermissionState } from './types'
import { getUserMenu } from '@/api/login'
import { permissionRouters, baseRoutes } from '@/router/index'
import { type siderbarRouteConfig } from '@/router'
import _ from 'lodash'

const buildRoutes = (routers: siderbarRouteConfig[], menus: string[]) => {
  const res: siderbarRouteConfig[] = []

  routers.map((item) => {
    if (menus.includes(item.path)) {
      if (item.children) {
        item.children = buildRoutes(item.children, menus)
      }
      res.push(item)
    }
  })
  return res
}

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
        const accessRoutes = []
        if (this.accessRoutes.length !== 0) {
          accessRoutes.push(...this.accessRoutes[0].children)
        }
        return baseRoutes[0].children?.concat(accessRoutes)
      },
      menus() {
        return this.accessRoutes[0].children
      },
    },
    actions: {
      async generateRoutes() {
        const { data } = await getUserMenu() // 调用接口获取后端传来的菜单路由
        const { menus } = data
        // buildRoutes(router, menus)
        menus.push('/')

        // this.accessRoutes = permissionRouters
        const deepCopy: siderbarRouteConfig[] = _.cloneDeep(permissionRouters)
        this.accessRoutes = buildRoutes(deepCopy, menus)
        // this.accessRoutes = permissionRouters
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
