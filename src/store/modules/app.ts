import piniaPersistConfig from '@/config/piniaPersist'
import { defineStore } from 'pinia'

export type TSidebar = {
  opened?: boolean
  withoutAnimation?: boolean
}

export interface IApp {
  sidebar: TSidebar
  device: string
}

// useAppStore
export const useAppStore = defineStore({
  id: 'useAppStore',
  state: (): IApp => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    device: 'desktop',
  }),
  getters: {

  },
  actions: {
    async toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },
    async closeSideBar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    async toggleDevice(device: string) {
      this.device = device
    },
  },
  persist: piniaPersistConfig('useAppStore'),
})
