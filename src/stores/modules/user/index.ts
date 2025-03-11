import { defineStore } from 'pinia'
import piniaStore from '@/stores/index'
import { type UserState } from './types'
import { getUserInfo } from '@/api/login'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: (): UserState => ({
      username: '',
      id: '',
      email: '',
      full_name: '',
      roles: [],
      dept: {},
    }),
    getters: {},
    actions: {
      updateSettings(partial: Partial<UserState>) {
        this.$patch(partial)
      },
      async getUserInfo() {
        try {
          const { code, data } = await getUserInfo()
          if (code === 200) {
            this.updateSettings(data)
          }
          return data
        } catch (error) {
          return error
        }
      },
    },
    persist: [
      {
        key: 'user-state', // 持久化存储的 key
        storage: localStorage, // 存储方式
      },
    ],
  },
)
export function useUserOutsideStore() {
  return useUserStore(piniaStore)
}
