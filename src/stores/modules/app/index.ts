import { defineStore } from 'pinia'
import piniaStore from '@/stores/index'
import type { AppState } from './types'

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: (): AppState => ({
      menuCollapse: true,
      userType: 'ldap', // local
      errorApiAlert: true,
    }),
    getters: {},
    actions: {
      updateSettings(partial: Partial<AppState>) {
        this.$patch(partial)
      },

      toggleMenuCollapse() {
        this.menuCollapse = !this.menuCollapse
      },

      setUserType(val: string) {
        this.userType = val
      },
      markArrorApiAlert() {
        this.errorApiAlert = false
        setTimeout(() => {
          this.errorApiAlert = true
        }, 3000)
      },
    },
    persist: [
      {
        key: 'app-state', // 持久化存储的 key
        storage: localStorage, // 存储方式
      },
    ],
  },
)
export function useAppOutsideStore() {
  return useAppStore(piniaStore)
}
