import { defineStore } from 'pinia'
import piniaStore from '@/stores/index'
import { type UserState, type Project } from './types'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: (): UserState => ({
      user_id: '',
      username: '',
      currentProject: { id: '', name: '', alias: '', creator: '' },
    }),
    getters: {},
    actions: {
      updateSettings(partial: Partial<UserState>) {
        this.$patch(partial)
      },

      setCurrentProject(obj: Project) {
        this.currentProject = obj
      },
    },
    persist: [
      {
        key: 'suer-state', // 持久化存储的 key
        storage: localStorage, // 存储方式
      },
    ],
  },
)
export function useUserOutsideStore() {
  return useUserStore(piniaStore)
}
